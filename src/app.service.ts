// Nest Pacakges
import { Injectable } from '@nestjs/common';

// Third-party Packages
import { InjectKysely } from 'nestjs-kysely';

// Custom Packages
import { DB } from './common/database';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectKysely() private db: DB,
  ) {}

  async getHello() {
    return 'Hello World';
  }
}
