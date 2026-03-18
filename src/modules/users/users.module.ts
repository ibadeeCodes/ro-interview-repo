import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repositories/user.repository';
import { HashingModule } from '../../common/modules/hashing/hashing.module';
import { EmployeesModule } from '../employees/employees.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HashingModule, EmployeesModule],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService, UserRepository]
})
export class UsersModule { }