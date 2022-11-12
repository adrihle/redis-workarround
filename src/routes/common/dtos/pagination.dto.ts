import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

class PaginationQueryDTO {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  page?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  offset?: number;
}

export { PaginationQueryDTO };
