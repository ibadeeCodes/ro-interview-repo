import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto, SignUpDto } from './dto';
import { HashingService } from '../../common/modules/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, JWTEncapsulatedPayload } from '../../common/types';
import { AUTH_MSG } from '../../common/constants/message';
import { ErrorModel, ResourceNotFoundErrorModel, ValidationFailedErrorModel } from '../../common/types/error.type';
import { AppContext } from '../../common/utils/interfaces/context.interface';
import { UserRepository } from '../users/repositories/user.repository';
import { EmployeeRepository } from '../employees/repositories/employee.repository';
import { UtilsService } from '../../common/utils/utils.service';
import { handleErrorFactory } from '../../common/utils/handleErrorFactory';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private hashingService: HashingService,
        private jwtService: JwtService,
        private userRepository: UserRepository,
        private employeeRepository: EmployeeRepository,
    ) { }

    async signIn(ctx: AppContext, email: string, password: string): Promise<AccessTokenPayload | ErrorModel> {
        const user = await this.usersService.findOneByEmail(ctx, email);

        if (!user) {
            return new ResourceNotFoundErrorModel(AUTH_MSG.INVALID_CREDS);
        }

        if (!user.is_active) {
            return new ResourceNotFoundErrorModel(AUTH_MSG.INACTIVE_ACCOUNT);
        }

        const isPasswordMatched = await this.hashingService.comparePassword(password, user.password)

        if (!isPasswordMatched) return new ResourceNotFoundErrorModel(AUTH_MSG.INVALID_CREDS);

        const JwtPayload: JWTEncapsulatedPayload = { id: user.id };

        const responsePaylaod: AccessTokenPayload = {
            access_token: await this.generateToken(JwtPayload),
        };

        return responsePaylaod
    }

    async SignUp(ctx: AppContext, payload: SignUpDto): Promise<AccessTokenPayload | ErrorModel> {

        const { name, email, password, role, is_active } = payload

        const newUser = await this.usersService.create(ctx, {
            name,
            email,
            is_active,
            password,
            role
        });

        if (newUser instanceof ErrorModel) return newUser;

        const JwtPayload: JWTEncapsulatedPayload = { id: newUser.id };

        const responsePaylaod: AccessTokenPayload = {
            access_token: await this.generateToken(JwtPayload),
        };

        return responsePaylaod
    }

    generateToken(payload: any) {
        return this.jwtService.signAsync(payload)
    }

    async getMyProfile(ctx: AppContext, userId: number) {
        const user = await this.usersService.findById(ctx, userId);

        if (!user) return new ResourceNotFoundErrorModel('User not found');

        const employee = await this.employeeRepository.findOneBy(ctx, { userId });

        delete user.password;

        return {
            ...user,
            employeeId: employee?.id,
        };
    }

    async changePassword(ctx: AppContext, userId: number, paylaod: ChangePasswordDto) {

        try {
            const { old_password, new_password } = paylaod

            const user = await this.usersService.findById(ctx, userId)

            const isOldPasswordMatched = await this.hashingService.comparePassword(old_password, user.password)

            if (!isOldPasswordMatched) return new ValidationFailedErrorModel('Old Password does not match.');

            const hashedNewPassword = await this.hashingService.hashPassword(new_password);

            await this.userRepository.save(ctx, {
                id: userId,
                password: hashedNewPassword
            })

            return null
        } catch (exception) {
            return handleErrorFactory(exception);
        }
    }
}