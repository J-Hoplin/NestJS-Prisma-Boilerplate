import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleQuery } from './dto';
import { PaginationQuery } from './decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() qs: ExampleQuery): string {
    const { page, limit, value } = qs;
    console.log(page, limit, value);
    return this.appService.getHello();
  }
}
