import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { BaseController } from '../../common/web/BaseController';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/role.guard';
import { Context } from '../../common/decorators/context.decorator';
import { AppContext } from '../../common/utils/interfaces/context.interface';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { FIND_ALL, ROLE } from '../../common/constants';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController extends BaseController {
    constructor(
        private readonly userService: UsersService,
        public readonly configService: ConfigService
    ) {
        super(configService)
    }

    // @Get('')
    // @Roles(ROLE.SUPER_ADMIN)
    // @UseGuards(RolesGuard)
    // @ApiOperation({ summary: 'Get all users' })
    // async findAllUsers(
    //     @Context() ctx: AppContext,
    //     @Query() searchQuery: any,
    //     @Query() paginationQuery: PaginationQueryDto,
    //     @Res() res: Response
    // ) {
    //     const result = await this.userService.findAllUsers(ctx, searchQuery, paginationQuery);
    //     return this.sendResponse({
    //         result,
    //         res,
    //         successMessage: FIND_ALL('All Users of System')
    //     })
    // }

    @Post('')
    @Roles(ROLE.SUPER_ADMIN)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Create a new user' })
    async create(
        @Context() ctx: AppContext,
        @Body() body: CreateUserDto,
        @Res() res: Response
    ) {
        const result = await this.userService.create(ctx, body);
        return this.sendResponse({
            result,
            res,
            successMessage: 'User created successfully'
        })
    }
}
