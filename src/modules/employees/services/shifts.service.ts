import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';
import { ShiftRepository } from '../repositories/shift.repository';
import { AppContext } from '../../../common/utils/interfaces/context.interface';
import { CreateShiftDto } from '../dto/create-shift.dto';
import { Shift } from '../entities/shift.entity';
import { ErrorModel, ForbiddenErrorModel, ResourceNotFoundErrorModel } from '../../../common/types/error.type';
import { handleErrorFactory } from '../../../common/utils/handleErrorFactory';

@Injectable()
export class ShiftsService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly shiftRepository: ShiftRepository,
  ) { }

  async createShift(ctx: AppContext, dto: CreateShiftDto): Promise<Shift | ErrorModel> {
    try {
      const employee = await this.employeeRepository.findOneById(ctx, dto.employeeId);

      if (!employee) {
        return new ResourceNotFoundErrorModel('Employee not found');
      }

      if (employee.userId === ctx.UserID) {
        return new ForbiddenErrorModel('You are not authorized to create shift for this employee');
      }

      const shift = await this.shiftRepository.save(ctx, {
        employeeId: dto.employeeId,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        isSwapped: false,
      });

      return shift;
    } catch (error) {
      return handleErrorFactory(error);
    }
  }
}
