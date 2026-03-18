import { Injectable } from '@nestjs/common';
import { In, LessThan } from 'typeorm';
import { EmployeeRepository } from '../repositories/employee.repository';
import { ShiftRepository } from '../repositories/shift.repository';
import { SwapRequestRepository } from '../repositories/swap-request.repository';
import { AppContext } from '../../../common/utils/interfaces/context.interface';
import { ProposeSwapDto } from '../dto/propose-swap.dto';
import { RespondAction, RespondToSwapDto } from '../dto/respond-to-swap.dto';
import { ReviewAction, ReviewSwapDto } from '../dto/review-swap.dto';
import { SwapRequest } from '../entities/swap-request.entity';
import { ErrorModel, ForbiddenErrorModel, ResourceNotFoundErrorModel, ValidationFailedErrorModel } from '../../../common/types/error.type';
import { handleErrorFactory } from '../../../common/utils/handleErrorFactory';
import { ROLE, SwapRequestStatus } from '../../../common/constants';
import { Transactional } from '../../../common/database/transaction/TransactionManager';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SwapRequestsService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly swapRequestRepository: SwapRequestRepository,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async proposeSwap(ctx: AppContext, dto: ProposeSwapDto): Promise<SwapRequest | ErrorModel> {
    try {
      const proposerId = ctx.UserID;

      const employee = await this.employeeRepository.findOneBy(ctx, {
        userId: proposerId,
      });

      if (!employee) {
        return new ResourceNotFoundErrorModel('Employee not found');
      }

      const proposingShift = await this.shiftRepository.findOneById(ctx, dto.proposingShiftId);
      const targetShift = await this.shiftRepository.findOneById(ctx, dto.targetShiftId);

      if (!proposingShift || !targetShift) {
        return new ResourceNotFoundErrorModel('One or both shifts not found');
      }

      if (proposingShift.employeeId === targetShift.employeeId) {
        return new ValidationFailedErrorModel('Cannot swap shifts with yourself');
      }

      const swapRequest = await this.swapRequestRepository.save(ctx, {
        proposingEmployeeId: proposerId,
        proposingShiftId: dto.proposingShiftId,
        targetEmployeeId: targetShift.employeeId,
        targetShiftId: dto.targetShiftId,
        status: SwapRequestStatus.PENDING_RECIPIENT,
      });

      this.eventEmitter.emit('swap-request.status.changed', swapRequest);

      return swapRequest;
    } catch (error) {
      return handleErrorFactory(error);
    }
  }

  @Transactional()
  async respondToSwap(ctx: AppContext, dto: RespondToSwapDto): Promise<SwapRequest | ErrorModel> {
    try {
      const responderId = ctx.UserID;

      const targetEmployee = await this.employeeRepository.findOneBy(ctx, {
        userId: responderId,
      });

      if (!targetEmployee) {
        return new ResourceNotFoundErrorModel('Employee not found');
      }

      const swapRequest = await this.swapRequestRepository.findOneById(ctx, dto.requestId);

      if (!swapRequest) {
        return new ResourceNotFoundErrorModel('Swap request not found');
      }

      if (swapRequest.targetEmployeeId !== targetEmployee.id) {
        return new ForbiddenErrorModel('You are not the target of this swap request');
      }

      if (swapRequest.status !== SwapRequestStatus.PENDING_RECIPIENT) {
        return new ValidationFailedErrorModel('This swap request has already been acted upon');
      }

      swapRequest.status = dto.action === RespondAction.ACCEPT
        ? SwapRequestStatus.ACCEPTED_BY_RECIPIENT
        : SwapRequestStatus.REJECTED_BY_RECIPIENT;

      if (dto.action === RespondAction.ACCEPT) {
        await this.assignManagerToSwapRequest(ctx, swapRequest);
      }

      const result = await this.swapRequestRepository.save(ctx, swapRequest);
      this.eventEmitter.emit('swap-request.status.changed', result);

      return result;
    } catch (error) {
      return handleErrorFactory(error);
    }
  }

  @Transactional()
  async reviewSwap(ctx: AppContext, dto: ReviewSwapDto): Promise<SwapRequest | ErrorModel> {
    try {
      const userId = ctx.UserID;
      const managerEmployee = await this.employeeRepository.findOneBy(ctx, { userId });

      if (!managerEmployee) {
        return new ForbiddenErrorModel('You are not authorized to review swap requests');
      }

      const swapRequest = await this.swapRequestRepository.findOneById(ctx, dto.requestId);

      if (!swapRequest) {
        return new ResourceNotFoundErrorModel('Swap request not found');
      }

      if (swapRequest.status !== SwapRequestStatus.ACCEPTED_BY_RECIPIENT) {
        return new ValidationFailedErrorModel('This swap request has already been reviewed');
      }

      if (swapRequest.managerId !== managerEmployee.id) {
        return new ValidationFailedErrorModel('You are not the assigned manager for this swap request');
      }

      swapRequest.status = dto.action === ReviewAction.APPROVE
        ? SwapRequestStatus.APPROVED_BY_MANAGER
        : SwapRequestStatus.REJECTED_BY_MANAGER;

      swapRequest.managerId = managerEmployee.id;

      if (dto.action === ReviewAction.APPROVE) {
        await this.markShiftsSwapped(ctx, swapRequest);
      }

      const result = await this.swapRequestRepository.save(ctx, swapRequest);
      this.eventEmitter.emit('swap-request.status.changed', result);
      return result;
    } catch (error) {
      return handleErrorFactory(error);
    }
  }

  async findAllSwaps(ctx: AppContext): Promise<SwapRequest[]> {
    await this.cleanupExpiredSwaps(ctx);
    return await this.swapRequestRepository.findAll(ctx);
  }

  private async cleanupExpiredSwaps(ctx: AppContext): Promise<void> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const expiredRequests = await this.swapRequestRepository.findAll(ctx, {
      status: In([SwapRequestStatus.PENDING_RECIPIENT, SwapRequestStatus.ACCEPTED_BY_RECIPIENT]),
      createdAt: LessThan(twentyFourHoursAgo),
    });

    if (expiredRequests.length > 0) {
      const expiredIds = expiredRequests.map((r) => r.id);
      await this.swapRequestRepository.updateBy(ctx, { idsIn: expiredIds }, { status: SwapRequestStatus.EXPIRED });

      for (const request of expiredRequests) {
        request.status = SwapRequestStatus.EXPIRED;
        this.eventEmitter.emit('swap-request.status.changed', request);
      }
    }
  }

  private async assignManagerToSwapRequest(ctx: AppContext, swapRequest: SwapRequest): Promise<void> {
    const managers = await this.employeeRepository.findAll(
      ctx,
      {
        user: {
          role: ROLE.MANAGER,
        },
      },
      undefined,
      { user: true },
      { id: 'DESC' },
    );

    if (managers && managers.length > 0) {
      swapRequest.managerId = managers[0].id;
    }
  }

  private async markShiftsSwapped(ctx: AppContext, swapRequest: SwapRequest): Promise<void> {
    const [proposingShift, targetShift] = await Promise.all([
      this.shiftRepository.findOneById(ctx, swapRequest.proposingShiftId),
      this.shiftRepository.findOneById(ctx, swapRequest.targetShiftId),
    ]);

    if (proposingShift && targetShift) {
      proposingShift.isSwapped = true;
      targetShift.isSwapped = true;

      await Promise.all([
        this.shiftRepository.save(ctx, proposingShift),
        this.shiftRepository.save(ctx, targetShift),
      ]);
    }
  }
}
