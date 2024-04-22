// Nest Packages
import { Injectable } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

// Custom Packages
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  /**
   * Prisma ORM connection status
   *
   * Storage: Use if 50% or upper
   * Memory: Use if more than 300 MB
   */
  check() {
    return this.health.check([
      () => this.db.pingCheck('database', this.prisma),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory', 300 * 1024 * 1024),
    ]);
  }
}
