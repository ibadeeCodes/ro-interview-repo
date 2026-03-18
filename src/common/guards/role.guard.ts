import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();

        const userId = request?.context?.userId
        const role = request?.context?.role

        if(!userId || !role) return false

        return requiredRoles.includes(role);
    }
}