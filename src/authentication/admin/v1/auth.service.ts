// Nest Packages
import { Injectable } from '@nestjs/common';

// Third-party Pacakges
import { Prisma } from '@prisma/client';

// Custom Packages
import { PrismaService } from '@app/prisma/prisma.service';
import { AdminV1ListUserQuery, ListUserCategory } from './dto';
import { AdminV1ListUserResponse } from './response';
import { PaginateMetadata } from '@app/decorator';

@Injectable()
export class AdminAuthV1Service {
  constructor(private readonly prisma: PrismaService) {}

  async listUser(query: AdminV1ListUserQuery) {
    let whereQuery: Prisma.UserWhereInput = {};

    switch (query.searchCategory) {
      case ListUserCategory.name:
        whereQuery = {
          firstName: {
            contains: query.search,
            mode: 'insensitive',
          },
        };
        break;
      case ListUserCategory.email:
        whereQuery = {
          email: {
            contains: query.search,
            mode: 'insensitive',
          },
        };
        break;
    }

    const listUser = await this.prisma.user.findMany({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      where: whereQuery,
      orderBy: {
        createdAt: query.order,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    const totalDataCount = await this.prisma.user.count({
      where: whereQuery,
    });

    return new AdminV1ListUserResponse(
      new PaginateMetadata(query.page, query.limit, totalDataCount),
      listUser,
    );
  }
}
