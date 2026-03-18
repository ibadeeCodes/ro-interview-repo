import { Transform } from 'class-transformer';
import { IsNumber, IsOptional} from 'class-validator';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  take: number = PAGE_SIZE;
}
