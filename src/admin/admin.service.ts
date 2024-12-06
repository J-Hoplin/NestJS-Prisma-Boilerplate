// Nest Packages
import { Injectable } from '@nestjs/common';

// Third-party Pacakges

// Custom Packages
import { AdminRepository } from './admin.repository';
import { AdminListUserQuery } from './serializer/request/list-user.query';

@Injectable()
export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  async listUser(query: AdminListUserQuery) {
    return await this.repository.findAllAndCountUsersfindAllUsers(
      query.page,
      query.limit,
      query.order,
      query.searchCategory,
      query.search,
    );
  }
}
