import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private context = 'Prisma-Debug';
  private logger = new Logger(this.context);

  constructor() {
    super({
      log: ['query', 'error', 'info', 'warn'],
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onModuleInit() {
    // Add prisma query loggging
    Object.assign(
      this,
      this.$on('query', (event) => {
        this.logger.debug(
          `Query - ${event.query}, Duration - ${event.duration}ms`,
          this.context,
        );
      }),
    );
    await this.$connect();
  }
}
