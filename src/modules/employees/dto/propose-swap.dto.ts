import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ProposeSwapDto {
  @ApiProperty()
  @IsInt()
  proposingShiftId: number;

  @ApiProperty()
  @IsInt()
  targetShiftId: number;
}
