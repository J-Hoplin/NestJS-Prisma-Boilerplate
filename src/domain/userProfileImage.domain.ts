import { UserProfileImage } from '@prisma/client';

export class UserProfileImageDomain implements UserProfileImage {
  id: string;
  key: string;
  originalName: string;
  extension: string;
  sizeKB: bigint;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
