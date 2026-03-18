import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SwapRequestsService } from './services/swap-requests.service';
import { ShiftsService } from './services/shifts.service';
import { ProposeSwapDto } from './dto/propose-swap.dto';
import { RespondToSwapDto } from './dto/respond-to-swap.dto';
import { ReviewSwapDto } from './dto/review-swap.dto';
import { CreateShiftDto } from './dto/create-shift.dto';
import { BaseController } from '../../common/web/BaseController';
import { Context } from '../../common/decorators/context.decorator';
import { AppContext } from '../../common/utils/interfaces/context.interface';
import { Roles } from '../../common/decorators/roles.decorator';
import { ROLE } from '../../common/constants';

@ApiTags('employees')
@ApiBearerAuth()
@Controller('employees')
export class EmployeesController extends BaseController {
  constructor(
    private readonly shiftsService: ShiftsService,
    private readonly swapRequestsService: SwapRequestsService,
    public readonly configService: ConfigService,
  ) {
    super(configService);
  }

  @Roles(ROLE.MANAGER, ROLE.EMPLOYEE)
  @Get('swaps')
  @ApiOperation({ summary: 'List all swap requests (triggers expiration cleanup)' })
  async findAllSwaps(@Context() ctx: AppContext, @Res() res: Response) {
    const result = await this.swapRequestsService.findAllSwaps(ctx);
    return this.sendResponse({
      result,
      res,
      successMessage: 'Swap requests retrieved successfully',
    });
  }

  @Roles(ROLE.EMPLOYEE)
  @Post('swaps/propose')
  @ApiOperation({ summary: 'Propose a shift swap' })
  async proposeSwap(
    @Context() ctx: AppContext,
    @Body() dto: ProposeSwapDto,
    @Res() res: Response,
  ) {
    const result = await this.swapRequestsService.proposeSwap(ctx, dto);
    return this.sendResponse({
      result,
      res,
      successMessage: 'Swap request proposed successfully',
    });
  }

  @Roles(ROLE.EMPLOYEE)
  @Post('swaps/respond')
  @ApiOperation({ summary: 'Respond to a pending swap request' })
  async respondToSwap(
    @Context() ctx: AppContext,
    @Body() dto: RespondToSwapDto,
    @Res() res: Response,
  ) {
    const result = await this.swapRequestsService.respondToSwap(ctx, dto);
    return this.sendResponse({
      result,
      res,
      successMessage: 'Responded to swap request successfully',
    });
  }

  @Roles(ROLE.MANAGER)
  @Post('swaps/review')
  @ApiOperation({ summary: 'Review (approve/reject) an accepted swap request' })
  async reviewSwap(
    @Context() ctx: AppContext,
    @Body() dto: ReviewSwapDto,
    @Res() res: Response,
  ) {
    const result = await this.swapRequestsService.reviewSwap(ctx, dto);
    return this.sendResponse({
      result,
      res,
      successMessage: 'Swap request reviewed successfully',
    });
  }

  @Roles(ROLE.MANAGER)
  @Post('shifts')
  @ApiOperation({ summary: 'Create a new shift' })
  async createShift(
    @Context() ctx: AppContext,
    @Body() dto: CreateShiftDto,
    @Res() res: Response,
  ) {
    const result = await this.shiftsService.createShift(ctx, dto);
    return this.sendResponse({
      result,
      res,
      successMessage: 'Shift created successfully',
    });
  }
}
