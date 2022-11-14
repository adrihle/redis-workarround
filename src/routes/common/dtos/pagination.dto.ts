import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

class PaginationQueryDTO {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  page?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, example: 20 })
  offset?: number;
}

class PaginationResponseDTO<T> {
  @ApiProperty({ type: Array })
  results: T[];
  @ApiProperty({ type: Number, example: 234 })
  totalCount: number;
  @ApiProperty({ type: Number, example: 1 })
  page: number;
  @ApiProperty({ type: Number, example: 12 })
  totalPages: number;
  @ApiProperty({ type: Number, example: 2 })
  nextPage?: number;
  @ApiProperty({ type: Number, example: 0 })
  prevPage?: number;
}

export { PaginationQueryDTO, PaginationResponseDTO };
