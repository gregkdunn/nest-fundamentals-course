// Using the Nest CLI let’s create this DTO by entering (in your terminal)
// nest g class common/dto/pagination-query.dto --no-spec

import { IsOptional, IsPositive } from 'class-validator';

/* PaginationQueryDto */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
