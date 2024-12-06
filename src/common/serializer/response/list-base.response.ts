import { ApiProperty } from '@nestjs/swagger';
import { PaginateMetadata } from '../base.serializer';

export class BaseListResponseSerializer<T> {
  @ApiProperty({
    type: PaginateMetadata,
  })
  metadata: PaginateMetadata;

  @ApiProperty()
  data: T | T[];

  constructor(page: number, limit: number, count: number, data?: null) {
    this.metadata = new PaginateMetadata(page, limit, count);
    this.data = data;
  }
}
