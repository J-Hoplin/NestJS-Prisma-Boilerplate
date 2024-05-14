// Standard Packages
import { Injectable } from '@nestjs/common';

// Third-party Packages
import { Prisma, User } from '@prisma/client';

// Custom Packages
import { ListUserCategory } from '@app/admin/v1/dto';
import type { AdminV1Repository } from '@app/admin/v1/repository/admin.repository';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class AdminPrismaRepository implements AdminV1Repository {
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
      'id' | 'firstName' | 'lastName' | 'email' | 'createdAt'
    >[];
  }> {
    let whereQuery: Prisma.UserWhereInput = {};

    switch (category) {
      case ListUserCategory.name:
        whereQuery = {
          firstName: {
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
          createdAt: order,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
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
