// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { UserProfileImage } from '@prisma/client';

export class UserProfileImageDomain implements UserProfileImage {
  @ApiProperty()
  id: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  sizeKB: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;
}
