import { IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  employeeId: number;

  @ApiProperty({ example: '2026-03-18T22:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '2026-03-19T06:00:00Z' })
  @IsDateString()
  endTime: string;
}
