// Nest Packages
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// Custom Packages
import { RoleGuard } from '@app/authorization/guard/roles.guard';
import { AllowRole } from '@app/common/decorator/role/roles.decorator';
import { AdminV1Service } from './auth.service';
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
