// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages

// Custom Pacakges
import { PaginateMetadata } from '@app/common/decorator';

export class AdminV1ListUserItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  constructor(data: AdminV1ListUserItem) {
    Object.assign(this, data);
  }
}

export class AdminV1ListUserResponse {
  @ApiProperty({
    type: PaginateMetadata,
  })
  metadata: PaginateMetadata;

  @ApiProperty({
    type: AdminV1ListUserItem,
    isArray: true,
  })
  data: AdminV1ListUserItem[];

  constructor(metadata: PaginateMetadata, data: AdminV1ListUserItem[]) {
    this.metadata = metadata;
    this.data = data;
  }
}
