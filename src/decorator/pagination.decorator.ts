import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

/**
 * DTO for pagination
 *
 * Page: Default value 1
 * Limit: Default value 10
 */
export class PaginationQuery {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number = 10;
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
  get total() {
    return this._total;
  }

  @ApiProperty()
  @Expose()
  get perPage() {
    return this._limit;
  }

  @ApiProperty()
  @Expose()
  get lastPage() {
    return Math.ceil(this._total / this._limit);
  }

  @ApiProperty()
  @Expose()
  get currentPage() {
    return this._page;
  }

  @ApiProperty()
  @Expose()
  get prevPage() {
    return this._page > 1 ? this._page - 1 : null;
  }

  @ApiProperty()
  @Expose()
  get nextpage() {
    return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
  }
}
