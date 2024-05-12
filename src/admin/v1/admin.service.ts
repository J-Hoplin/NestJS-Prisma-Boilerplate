// Nest Packages
import { Injectable } from '@nestjs/common';

// Third-party Pacakges

// Custom Packages
import { PaginateMetadata } from '@app/common/decorator';
import { PrismaService } from '@app/prisma/prisma.service';
import { AdminV1ListUserQuery } from './dto';
import { AdminV1Repository } from './repository';
import { AdminV1ListUserResponse } from './response';

@Injectable()
export class AdminV1Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: AdminV1Repository,
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
