import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "src/common/database/repositories/AbstractBase.repository";
import { UserEntity } from "../entity/user.entity";
import { ILike, Repository } from "typeorm";
import { AppContext } from "src/common/utils/interfaces/context.interface";
import { PaginationQueryDto } from "src/common/dto/pagination.dto";
import { PagedList } from "src/common/types/pagedList.type";
import { IUserRepository } from "../interface/IUserRepository.interface";

export class UserRepository extends BaseAbstractRepostitory<UserEntity> implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
        super(userRepository)
    }

    async findAllWithPagination(
        ctx: AppContext,
        conditions?: any,
        paginationParams?: PaginationQueryDto
    ): Promise<PagedList<UserEntity>> {
        let where: any = {};

        if (conditions.name) where.name = ILike(`${conditions.name}%`);

        if (conditions.email) where.email = ILike(`${conditions.email}%`);

        if (conditions.role) where.role = conditions.role;

        if (conditions.is_active) where.is_active = conditions.is_active;

        const users = await this.findPage(
            ctx,
            {
                page: paginationParams.page,
                take: paginationParams.take
            },
            where,
            {},
            {}
        );

        return users;
    }
}