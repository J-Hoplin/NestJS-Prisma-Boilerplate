// Standard Packages
import { Injectable } from '@nestjs/common';

// Third-party Packages
import { Prisma, User } from '@prisma/client';

// Custom Packages
import { PrismaService } from '@app/prisma/prisma.service';
import { ListUserCategory } from './dto';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

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
    let whereQuery: Prisma.UserWhereInput = {};

    switch (category) {
      case ListUserCategory.name:
        whereQuery = {
          first_name: {
            contains: search,
            mode: 'insensitive',
          },
        };
        break;
      case ListUserCategory.email:
        whereQuery = {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        };
        break;
    }
    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: {
          created_at: order,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          created_at: true,
        },
      }),
      this.prisma.user.count({
        where: whereQuery,
      }),
    ]);
    return {
      count: count,
      users: users,
    };
  }
}
