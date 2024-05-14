import { User, UserProfileImage } from '@prisma/client';
import { Kysely } from 'kysely';

// Kysley client type
export type DB = Kysely<Database>;

// Databse & Prisma Interface Mapper.
interface Database {
  user: User;
  user_profile_image: UserProfileImage;
}
