import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseFilters } from './AbstractBase.repository';
import { UpdateResult } from 'typeorm';
import { AppContext } from '../../utils/interfaces/context.interface';
import { PagedList } from '../../types/pagedList.type';
import { PaginationQueryDto } from '../../dto/pagination.dto';

export type FilterOptions<E> = {
  [key: string | symbol]: any;
};

export type Relations<E> = any;
export type Ordering<E> = any;

export type SelectOptions<E> = {
  [Property in keyof E]: SelectOptions<Property> | boolean | any;
};

export interface IAbstractBaseRepository<E>
  extends IReadRepository<E>,
    ISaveRepository<E>,
    IUpdateRepository<E> {}

export interface IReadRepository<E> {
  count(context: AppContext, filter?: FilterOptions<E>): Promise<number>;

  findAll(
    context: AppContext,
    filter?: FilterOptions<E>,
    select?: SelectOptions<E>,
    relations?: Relations<E>,
    order?: Ordering<E>
  ): Promise<E[]>;

//   findPage(
//     context: AppContext,
//     pagination: PaginationQueryDto,
//     filter?: FilterOptions<E>,
//     select?: SelectOptions<E>,
//     relations?: Relations<E>,
//     order?: Ordering<E>
//   ): Promise<PagedList<E>>;

//   findOne(
//     context: AppContext,
//     id: number,
//     select?: SelectOptions<E>,
//     relations?: Relations<E>
//   ): Promise<E>;

  findOneBy(
    context: AppContext,
    filter: FilterOptions<E>,
    select?: SelectOptions<E>,
    relations?: Relations<E>
  ): Promise<E>;
}

export interface ISaveRepository<E> {
//   deleteByIds(
//     ctx: AppContext,
//     ids: number[],
//     column: string
//   ): Promise<UpdateResult>;

  save(context: AppContext, entity: E): Promise<E>;

//   saveAll(context: AppContext, entities: E[]): Promise<E[]>;

//   delete(context: AppContext, entity: E): Promise<E>;
}

export interface IUpdateRepository<E> {
  updateBy(
    context: AppContext,
    filters: BaseFilters,
    fields: QueryDeepPartialEntity<E>
  ): Promise<Boolean>;
}
