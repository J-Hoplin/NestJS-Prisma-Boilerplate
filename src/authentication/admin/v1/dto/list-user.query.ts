// Custom Pacakges
import { PaginationQuery } from '@app/decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ListUserCategory {
  name = 'name',
  email = 'email',
}

export class AdminV1ListUserQuery extends PaginationQuery {
  @ApiProperty({
    description: 'Search',
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string = '';

  @ApiProperty({
    required: false,
    enum: ListUserCategory,
    description: 'Search category',
  })
  @IsEnum(ListUserCategory)
  @IsOptional()
  searchCategory: ListUserCategory;
}
