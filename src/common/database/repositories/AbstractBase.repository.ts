import { DeepPartial, In, QueryRunner, Repository, SelectQueryBuilder } from "typeorm";
import _ from "lodash";
import { IAbstractBaseRepository } from "./IAbstractBase.interface";
import { AppContext } from "../../utils/interfaces/context.interface";
import { FilterOptions, Ordering, Relations, SelectOptions } from "./IAbstractBase.interface";
import { PaginationQueryDto } from "../../dto/pagination.dto";
import { PagedList } from "../../types/pagedList.type";
import { DEFAULT_PAGE, PAGE_SIZE } from "../../constants";
import { TX } from "../transaction/Constants";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface BaseFilters {
    idsIn?: number[];
    id?: number;
}
export abstract class BaseAbstractRepostitory<E> implements IAbstractBaseRepository<E>{
    private repo: Repository<E>
    protected constructor(repo: Repository<E>) {
        this.repo = repo
    }

    private getQueryExecutor(context: AppContext): Repository<E> {
        return context?.[TX]?.Transaction.QueryRunner.manager.getRepository<E>(this.repo.metadata.target) || this.repo;
    }
    
    getQueryBuilder(context: AppContext): SelectQueryBuilder<E> {
        return this.getQueryExecutor(context).createQueryBuilder(this.repo.metadata.tableName)
    }      

    getQueryRunner(context: AppContext): QueryRunner {
        return this.getQueryExecutor(context).queryRunner
    }   

    private async customizeWhereClause(
        context: AppContext,
        filter?: FilterOptions<E> | FilterOptions<E>[]
    ) {
        const whereClause = filter ?? {};
        return whereClause;
    }

    async count(context: AppContext, filter?: FilterOptions<E>): Promise<number> {
        const where = await this.customizeWhereClause(context, filter);
        return this.getQueryExecutor(context).count({
            where
        });
    }

    save(context: AppContext, entity: DeepPartial<E>): Promise<E> {
        const createdEntity = this.repo.create(entity);
        return this.getQueryExecutor(context).save(createdEntity);
    }

    async findOneBy(
        context: AppContext,
        filter: FilterOptions<E>,
        select?: SelectOptions<Partial<E>>,
        relations?: Relations<E>
    ): Promise<E | null> {
        const where = await this.customizeWhereClause(
            context,
            filter
        );

        return this.getQueryExecutor(context).findOne({
            where,
            select: select ?? undefined,
            relations: relations ?? undefined,
        });
    }

    async findPage(
        context: AppContext,
        pagination: PaginationQueryDto,
        filter?: FilterOptions<E>,
        select?: SelectOptions<Partial<E>>,
        relations?: Relations<E>,
        order?: Ordering<E>
    ): Promise<PagedList<E>> {
        const { take = PAGE_SIZE, page = DEFAULT_PAGE } = pagination;

        const where = await this.customizeWhereClause(
            context,
            filter
        );

        const [result, total] = await this.getQueryExecutor(context).findAndCount({
            where,
            relations: relations ?? undefined,
            take: take,
            skip: (page - 1) * take,
            select: select ?? undefined,
            order: order ?? undefined,
        });

        return new PagedList<E>(result, total, take, page);
    }

    async findOneById(
        context: AppContext,
        id: number,
        select?: SelectOptions<Partial<E>>,
        relations?: Relations<E>
    ): Promise<E | null> {

        const where: FilterOptions<E> = {
            id
        }

        return this.getQueryExecutor(context).findOne({
            where,
            select: select ?? undefined,
            relations: relations ?? undefined,
        });
    }

    async findAll(
        context: AppContext,
        filter?: FilterOptions<E> | FilterOptions<E>[],
        select?: SelectOptions<Partial<E>>,
        relations?: Relations<E>,
        order?: Ordering<E>
    ): Promise<E[]> {
        const where = await this.customizeWhereClause(
            context,
            filter
        );

        const result: E[] = await this.getQueryExecutor(context).find(
            {
                where,
                select: select ?? undefined,
                relations: relations ?? undefined,
                order: order ?? undefined,
            });

        return result
    }

    async remove(context: AppContext, entity: E): Promise<E> {
        return await this.getQueryExecutor(context).remove(entity)
    }

    public async findByIds(
        ctx: AppContext,
        ids: number[],
        select?: SelectOptions<Partial<E>>,
        relations?: Relations<E>,
        order?: Ordering<E>
    ): Promise<E[]> {
        return this.findAll(ctx, {
            id: In(ids),
        },
            select,
            relations,
            order
        );
    }

    async updateBy(
        context: AppContext,
        filters: any,
        fields: QueryDeepPartialEntity<E>
    ): Promise<Boolean> {
        const where: any = await this.customizeWhereClause(context, filters);

        if (where.idsIn) {
            where.id = In(filters.idsIn);
            delete where['idsIn'];
        }

        const update = await this.getQueryExecutor(context).update(where, fields)
        return update?.affected === 0 ? false : true
    }

    async updateById(
        context: AppContext,
        id: number,
        fields: QueryDeepPartialEntity<E>
    ): Promise<Boolean> {
        return await this.updateBy(context, { id }, fields)
    }
    
}