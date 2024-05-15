// Standard Packages
import { Injectable } from '@nestjs/common';

// Third-party Packages
import { $Enums, User } from '@prisma/client';
import { InjectKysely } from 'nestjs-kysely';
import { v4 } from 'uuid';

// Custom Packages
import { DB } from '@app/common/database';
import { UserV1SigninDto, UserV1SignupDto } from '../../dto';
import { AuthV1Repository } from '../auth.repository';

@Injectable()
export class AuthKysleyRepository implements AuthV1Repository {
  constructor(@InjectKysely() private readonly db: DB) {}

  async userSignup(
    data: UserV1SignupDto,
    type: $Enums.SignupType,
  ): Promise<Pick<User, 'id'>> {
    const now = new Date();
    const id = v4();
    // Insert new user
    await this.db
      .insertInto('user')
      .values({
        id: id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        sign_up_type: type,
        created_at: now,
        updated_at: now,
      })
      .execute();
    return {
      id: id,
    };
  }

  async userSignin(
    data: UserV1SigninDto,
  ): Promise<Pick<User, 'id' | 'password'>> {
    const findUser = await this.db
      .selectFrom('user')
      .where('email', '=', data.email)
      .select(['id', 'password'])
      .executeTakeFirst();
    return findUser;
  }
}
