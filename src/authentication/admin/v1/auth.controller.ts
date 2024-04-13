// Nest Packages
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

// Custom Packages
import { RoleGuard } from '@app/authorization/guard/roles.guard';
import { AllowRole } from '@app/decorator/role/roles.decorator';
import { AdminAuthV1Service } from './auth.service';
import { AdminV1ListUserDocs } from './docs';
import { AdminV1ListUserQuery } from './dto';

// This API is for only example. This API will be moved to `User` module in near future
@Controller({
  version: '1',
})
@UseGuards(RoleGuard)
@AllowRole(['ADMIN'])
@ApiBearerAuth()
export class AdminAuthV1Controller {
  constructor(private readonly authService: AdminAuthV1Service) {}

  @Get('/users')
  @AllowRole(['MAINTAINER'])
  @AdminV1ListUserDocs
  listUsers(@Query() query: AdminV1ListUserQuery) {
    return this.authService.listUser(query);
  }
}
