import { User as UserTable } from '@prisma/client';
import { Insertable, Kysely, Selectable, Updateable } from 'kysely';

// Kysley client type
export type DB = Kysely<Database>;

// Databse & Prisma Interface Mapper.
interface Database {
  user: User;
  // user_profile_image: UserProfileImage;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
