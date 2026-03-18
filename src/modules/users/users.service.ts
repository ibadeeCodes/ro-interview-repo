import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { ErrorModel, ResourceAlreadyExistsErrorModel } from '../../common/types/error.type';
import { CreateUserDto } from './dto/createUser.dto';
import { AppContext } from '../../common/utils/interfaces/context.interface';
import { UserRepository } from './repositories/user.repository';
import { HashingService } from '../../common/modules/hashing/hashing.service';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { PagedList } from '../../common/types/pagedList.type';
import { handleErrorFactory } from '../../common/utils/handleErrorFactory';
import { ROLE } from '../../common/constants';
import { Transactional } from '../../common/database/transaction/TransactionManager';
import { EmployeeRepository } from '../employees/repositories/employee.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly userRepositoryV2: UserRepository,
    private readonly hashService: HashingService,
    private readonly employeeRepository: EmployeeRepository
  ) { }

  @Transactional()
  async create(ctx: AppContext, payload: CreateUserDto): Promise<UserEntity | ErrorModel> {

    const userExists = await this.usersRepository.findOneBy(ctx, {
      email: payload.email
    })

    if (userExists) return new ResourceAlreadyExistsErrorModel('User with this email already exist')

    payload.password = await this.hashService.hashPassword(payload.password);
    const result = await this.usersRepository.save(ctx, payload);

    if (result instanceof UserEntity && (result.role === ROLE.EMPLOYEE || result.role === ROLE.MANAGER)) {
      await this.employeeRepository.save(ctx, {
        userId: result.id,
        name: result.name
      });
    }

    return result;
  }

  findById(ctx: AppContext, id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy(ctx, { id });
  }

  async findAllUsers(
    ctx: AppContext,
    searchQuery: any,
    paginationQuery: PaginationQueryDto,
  ): Promise<PagedList<UserEntity> | ErrorModel> {
    try {
      return this.userRepositoryV2.findAllWithPagination(ctx, searchQuery, paginationQuery);
    } catch (exception) {
      return handleErrorFactory(exception);
    }
  }

  findOneByEmail(ctx: AppContext, email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy(ctx, { email },
      {
        id: true,
        email: true,
        password: true,
        is_active: true,
        role: true
      },
      {});
  }
}
