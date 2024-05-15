// Standard Packages
import { Injectable } from '@nestjs/common';

// Third-party Packages
import { User } from '@prisma/client';
import { InjectKysely } from 'nestjs-kysely';

// Custom Packages
import { DB } from '@app/common/database';
import { ListUserCategory } from '../../dto';
import { AdminV1Repository } from '../admin.repository';

@Injectable()
export class AdminKysleyRepository implements AdminV1Repository {
  constructor(@InjectKysely() private readonly db: DB) {}

  async findAllAndCountUsersfindAllUsers(
    page: number,
    limit: number,
    order: 'asc' | 'desc',
    category: ListUserCategory,
    search: string,
  ): Promise<{
    count: number;
    users: Pick<
      User,
      'id' | 'first_name' | 'last_name' | 'email' | 'created_at'
    >[];
  }> {
    switch (category) {
      case ListUserCategory.name:
        break;
      case ListUserCategory.email:
        break;
    }

    const [users, count] = await this.db.transaction().execute(async (tx) => {
      let userQuery = tx
        .selectFrom('user')
        .select(['id', 'first_name', 'last_name', 'email', 'created_at']);
      let countQuery = tx
        .selectFrom('user')
        .select(this.db.fn.count('id').as('count'));
      switch (category) {
        case ListUserCategory.name:
          userQuery = userQuery.where('first_name', 'ilike', `%${search}%`);
          countQuery = countQuery.where('first_name', 'ilike', `%${search}%`);
          break;
        case ListUserCategory.email:
          userQuery = userQuery.where('email', 'ilike', `%${search}%`);
          countQuery = countQuery.where('email', 'ilike', `%${search}%`);
          break;
      }
      const userQueryResult = await userQuery
        .orderBy('created_at', order)
        .offset((page - 1) * limit)
        .limit(limit)
        .execute();
      const countQueryResult = await countQuery.execute();
      console.log(countQueryResult);
      return [userQueryResult, Number(countQueryResult[0].count)];
    });
    return {
      count: count,
      users: users,
    };
  }
}
