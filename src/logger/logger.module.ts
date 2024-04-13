// Nest Packages
import { Module } from '@nestjs/common';

// Custom Packages
import { GlobalLogger } from './logger.service';

@Module({
  providers: [GlobalLogger],
  exports: [GlobalLogger],
})
export class LoggerModule {}
