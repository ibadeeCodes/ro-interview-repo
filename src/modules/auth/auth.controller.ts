import { Body, Controller, Post, HttpCode, HttpStatus, Get, Res, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ChangePasswordDto, SignInWithEmailDto, SignUpDto } from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { AppContext } from '../../common/utils/interfaces/context.interface';
import { Context } from '../../common/decorators/context.decorator';
import { BaseController } from '../../common/web/BaseController';
import { AUTH_MSG } from '../../common/constants/message';
import { FIND_ONE, USER } from '../../common/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
    constructor(
        private readonly authService: AuthService,
        public readonly configService: ConfigService
    ) {
        super(configService)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @ApiOperation({ summary: 'Sign in with email' })
    async signIn(@Body() payload: SignInWithEmailDto, @Res() res: Response) {
        const result = await this.authService.signIn(new AppContext(), payload.email, payload.password);
        return this.sendResponse({
            result,
            res,
            successMessage: AUTH_MSG.SIGNED_IN
        })
    }

    @Public()
    @Post('signup')
    @ApiOperation({ summary: 'Sign up new user' })
    async signUp(
        @Body() payload: SignUpDto,
        @Res() res: Response
    ) {
        const result = await this.authService.SignUp(new AppContext(), payload);
        return this.sendResponse({
            result,
            res,
            successMessage: AUTH_MSG.SIGNED_UP
        })
    }

    @ApiBearerAuth()
    @Get('profile')
    @ApiOperation({ summary: 'Get current user profile' })
    async getProfile(
        @Context() ctx: AppContext,
        @Res() res: Response
    ) {
        const result = await this.authService.getMyProfile(ctx, ctx.UserID)
        return this.sendResponse({
            result,
            res,
            successMessage: FIND_ONE(`${USER} Profile`)
        })
    }

    // @ApiBearerAuth()
    // @Put('change-password')
    // @ApiOperation({ summary: 'Change user password' })
    // async changePassword(@Context() ctx: AppContext, @Body() body: ChangePasswordDto, @Res() res: Response) {
    //     const result = await this.authService.changePassword(ctx, ctx.UserID, body);
    //     return this.sendResponse({
    //         result,
    //         res,
    //         successMessage: AUTH_MSG.PASSWORD_CHANGED
    //     })
    // }
}
