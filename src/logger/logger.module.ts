import { Module } from '@nestjs/common';
import { GlobalLogger } from './logger.service';

@Module({
  providers: [GlobalLogger],
  exports: [GlobalLogger],
})
export class LoggerModule {}
