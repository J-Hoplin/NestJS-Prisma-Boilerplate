import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleQuery } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/example')
  listExample(@Query() qs: ExampleQuery) {
    return this.appService.listExample(qs);
  }
}
