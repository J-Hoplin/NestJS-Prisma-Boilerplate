// Nest Pacakges
import { Injectable } from '@nestjs/common';

// Custom Packages
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
