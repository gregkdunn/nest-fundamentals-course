// Using the Nest CLI let’s create this DTO by entering (in your terminal)
// nest g class common/dto/pagination-query.dto --no-spec

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

/* PaginationQueryDto */
export class PaginationQueryDto {
  @ApiProperty({ description: 'The number of objects returned' })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ description: 'Starts with this number' })
  @IsOptional()
  @IsPositive()
  offset: number;
}
