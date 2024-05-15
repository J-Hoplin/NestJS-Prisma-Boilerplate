// Nest Packages
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// Custom Packages
import { AllowRole } from '@app/common/decorator/role/roles.decorator';
import { RoleGuard } from '@app/common/guard';
import { AdminV1Service } from './admin.service';
import { AdminV1ControllerDocs, AdminV1ListUserDocs } from './docs';
import { AdminV1ListUserQuery } from './dto';

@Controller({
  version: '1',
  path: 'admin',
})
@UseGuards(RoleGuard)
@AllowRole(['ADMIN'])
@AdminV1ControllerDocs
export class AdminV1Controller {
  constructor(private readonly authService: AdminV1Service) {}

  @Get('/users')
  @AllowRole(['MAINTAINER'])
  @AdminV1ListUserDocs
  listUsers(@Query() query: AdminV1ListUserQuery) {
    return this.authService.listUser(query);
  }
}
