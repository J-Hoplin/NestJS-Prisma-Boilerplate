// Nest Packages
import { ApiProperty, PickType } from '@nestjs/swagger';

// Third-party Packages

// Custom Pacakges
import { PaginateMetadata } from '@app/decorator';
import { UserDomain } from '@app/domain';

export class AdminV1ListUserItem extends PickType(UserDomain, [
  'id',
  'firstName',
  'lastName',
  'email',
  'createdAt',
]) {}

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
