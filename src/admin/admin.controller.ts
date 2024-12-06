// Nest Packages
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// Custom Packages
import { AllowRole } from '@app/common/decorator/role/roles.decorator';
import { RoleGuard } from '@app/common/guard';
import { AdminService } from './admin.service';
import { AdminControllerDocs, AdminListUserDocs } from './docs';
import { AdminListUserQuery } from './serializer/request/list-user.query';
import {
  AdminListUserItem,
  AdminListUserResponse,
} from './serializer/response/list-user.response';

@Controller({
  path: 'admin',
})
@UseGuards(RoleGuard)
@AllowRole(['ADMIN'])
@AdminControllerDocs
export class AdminController {
  constructor(private readonly authService: AdminService) {}

  @Get('/users')
  @AdminListUserDocs
  async listUsers(@Query() query: AdminListUserQuery) {
    const { count, users } = await this.authService.listUser(query);
    const data = users.map((user) => new AdminListUserItem(user));
    return new AdminListUserResponse(query.page, query.limit, count, data);
  }
}
