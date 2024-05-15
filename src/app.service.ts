// Nest Pacakges
import { Injectable } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello() {
    return 'Hello World';
  }
}
