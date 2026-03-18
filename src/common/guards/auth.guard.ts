import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AppContext } from '../utils/interfaces/context.interface';
import { UserRepository } from '../../modules/users/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
    private static readonly CONTEXT: string = 'context';
    private static readonly CAN_ACTIVATE: boolean = true
    private static readonly CAN_NOT_ACTIVATE: boolean = false
    private static readonly JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private readonly userRepository: UserRepository
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return AuthGuard.CAN_ACTIVATE;

        const request = context.switchToHttp().getRequest();
        const receivedToken = this.extractTokenFromHeader(request);

        if (!receivedToken) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(receivedToken, {
                secret: AuthGuard.JWT_SECRET_KEY,
            });

            // Extract user information from payload
            const { id } = payload;

            const user = await this.userRepository.findOneById(new AppContext(), id, {
                id: true,
                role: true,
                // partner: true
            }, {
                // partner: true
            })

            // const partnerId = user?.partner?.id || null

            request[AuthGuard.CONTEXT] = new AppContext(id, ROLE[user?.role], receivedToken, null, null);

        } catch (err) {
            console.log(err)
            return AuthGuard.CAN_NOT_ACTIVATE
        }
        return AuthGuard.CAN_ACTIVATE;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}