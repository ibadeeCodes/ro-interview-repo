import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';

export enum RespondAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
}

export class RespondToSwapDto {
  @ApiProperty()
  @IsInt()
  requestId: number;

  @ApiProperty({ enum: RespondAction })
  @IsEnum(RespondAction)
  action: RespondAction;
}
