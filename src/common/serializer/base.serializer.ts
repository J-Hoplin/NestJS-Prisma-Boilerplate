import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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
