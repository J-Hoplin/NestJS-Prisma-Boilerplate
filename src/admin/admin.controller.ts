// Nest Packages
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// Custom Packages
import { AllowRole } from '@app/common/decorator/role/roles.decorator';
import { RoleGuard } from '@app/common/guard';
import { AdminService } from './admin.service';
import { AdminV1ControllerDocs, AdminV1ListUserDocs } from './docs';
import { AdminV1ListUserQuery } from './dto';

@Controller({
  path: 'admin',
})
@UseGuards(RoleGuard)
@AllowRole(['ADMIN'])
@AdminV1ControllerDocs
export class AdminController {
  constructor(private readonly authService: AdminService) {}

  @Get('/users')
  @AllowRole(['MAINTAINER'])
  @AdminV1ListUserDocs
  listUsers(@Query() query: AdminV1ListUserQuery) {
    return this.authService.listUser(query);
  }
}
