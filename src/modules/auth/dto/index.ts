import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ROLE } from "src/common/constants";

export class SignInWithEmailDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 255, { message: 'Password must be at least 8 characters long' })
    password: string
}

export class SignUpDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ enum: ROLE })
    @IsString()
    role: ROLE;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 255, { message: 'Password must be at least 8 characters long' })
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class ChangePasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'old_password can not be empty' })
    old_password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'new_password can not be empty' })
    @Length(8, 255, { message: 'New password must be at least 8 characters long' })
    new_password: string;
}