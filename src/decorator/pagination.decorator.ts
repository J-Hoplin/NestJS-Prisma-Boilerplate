import { ApiProperty } from '@nestjs/swagger';
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
    description: 'Default value & minimum is 1',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    default: 10,
    description: 'Default value is 10 Minimum is 1',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number = 10;

  @ApiProperty({
    required: false,
    enum: Prisma.SortOrder,
    default: Prisma.SortOrder.desc,
    description: 'Order to sort datas',
  })
  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  order: Prisma.SortOrder;

  // Will be transformed to {skip:number, take:number}
  @Expose()
  prismaPagination(): { skip: number; take: number } {
    return {
      skip: (this.page - 1) * this.limit,
      take: this.limit,
    };
  }
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
