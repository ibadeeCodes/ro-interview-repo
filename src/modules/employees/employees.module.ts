import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Shift } from './entities/shift.entity';
import { SwapRequest } from './entities/swap-request.entity';
import { EmployeeRepository } from './repositories/employee.repository';
import { ShiftRepository } from './repositories/shift.repository';
import { SwapRequestRepository } from './repositories/swap-request.repository';
import { SwapRequestsService } from './services/swap-requests.service';
import { ShiftsService } from './services/shifts.service';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Shift, SwapRequest])],
  controllers: [EmployeesController],
  providers: [
    EmployeeRepository,
    ShiftRepository,
    SwapRequestRepository,
    SwapRequestsService,
    ShiftsService,
  ],
  exports: [EmployeeRepository, SwapRequestsService, ShiftsService],
})
export class EmployeesModule {}
