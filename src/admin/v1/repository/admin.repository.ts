// Third-party Packages
import { User } from '@prisma/client';

// Custom Packages
import { ListUserCategory } from '@app/admin/v1/dto';

export abstract class AdminV1Repository {
  abstract findAllAndCountUsersfindAllUsers(
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
  }>;
}
