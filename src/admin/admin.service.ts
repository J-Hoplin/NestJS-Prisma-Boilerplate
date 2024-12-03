// Nest Packages
import { Injectable } from '@nestjs/common';

// Third-party Pacakges

// Custom Packages
import { PaginateMetadata } from '@app/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { AdminRepository } from './admin.repository';
import { AdminV1ListUserQuery } from './dto';
import { AdminV1ListUserResponse } from './response';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: AdminRepository,
  ) {}

  async listUser(query: AdminV1ListUserQuery) {
    const { count, users } =
      await this.repository.findAllAndCountUsersfindAllUsers(
        query.page,
        query.limit,
        query.order,
        query.searchCategory,
        query.search,
      );

    return new AdminV1ListUserResponse(
      new PaginateMetadata(query.page, query.limit, count),
      users,
    );
  }
}
