// Nest Packages
import { BaseListResponseSerializer } from '@app/common/serializer';
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages

// Custom Pacakges
import { User } from '@prisma/client';

export class AdminListUserItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  created_at: Date;

  constructor(data: User) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.created_at = data.created_at;
  }
}

export class AdminListUserResponse extends BaseListResponseSerializer<AdminListUserItem> {
  @ApiProperty({ type: [AdminListUserItem] })
  data: AdminListUserItem[];

  constructor(
    page: number,
    limit: number,
    count: number,
    data: AdminListUserItem[],
  ) {
    super(page, limit, count);
    this.data = data;
  }
}
