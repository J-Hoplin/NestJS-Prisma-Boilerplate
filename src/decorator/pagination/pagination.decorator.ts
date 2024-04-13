// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { Prisma } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

/**
 * DTO for pagination
 *
 * Page: Default value 1
 * Limit: Default value 10
 */
export class PaginationQuery {
  @ApiProperty({
    default: 1,
    description: 'Default value & Starting from 1',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({
    default: 10,
    description: 'Default value is 10 Starting from 1',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit: number = 10;

  @ApiProperty({
    required: false,
    enum: Prisma.SortOrder,
    default: Prisma.SortOrder.desc,
    description: 'Order to sort datas',
  })
  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  readonly order: Prisma.SortOrder = Prisma.SortOrder.desc;
}

// Pagination metadata response type for GET list APIs
export class PaginateMetadata {
  @Exclude()
  private _page: number;

  @Exclude()
  private _limit: number;

  @Exclude()
  private _total: number;

  constructor(page: number, limit: number, total: number) {
    this._page = page;
    this._limit = limit;
    this._total = total;
  }

  @ApiProperty()
  @Expose()
  get total(): number {
    return this._total;
  }

  @ApiProperty()
  @Expose()
  get hasNext(): boolean {
    return Boolean(this.nextpage);
  }

  @ApiProperty()
  @Expose()
  get perPage(): number {
    return this._limit;
  }

  @ApiProperty()
  @Expose()
  get lastPage(): number {
    return Math.ceil(this._total / this._limit);
  }

  @ApiProperty()
  @Expose()
  get currentPage(): number {
    return this._page;
  }

  @ApiProperty()
  @Expose()
  get prevPage(): number | null {
    return this._page > 1 ? this._page - 1 : null;
  }

  @ApiProperty()
  @Expose()
  get nextpage(): number | null {
    return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
  }
}
