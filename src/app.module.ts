import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfig, DatabaseConfig } from './common/config';
import { UtilsModule } from './common/utils/utils.module';
import { APP_FILTER } from '@nestjs/core';
import { TransactionModule } from './common/database/transaction/TransactionModule';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MailModule } from './common/modules/mail/mail.module';
import { FileModule } from './common/modules/file/file.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService]
    }),
    UtilsModule,
    TransactionModule,
    MailModule,
    AuthModule,
    EmployeesModule,
    FileModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext.apply(LoggerMiddleware).forRoutes('*');
  }
}
