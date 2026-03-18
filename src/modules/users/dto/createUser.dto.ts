import { IsEmail, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '../../../common/constants';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: ROLE })
  @IsString()
  role: ROLE;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
