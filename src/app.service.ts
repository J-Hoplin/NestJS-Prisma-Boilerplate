// Nest Pacakges
import { Injectable } from '@nestjs/common';

// Custom Packages
import { InjectKysely } from 'nestjs-kysely';
import { DB } from './common/database';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectKysely() private db: DB,
  ) {}

  async getHello() {
    return await this.db.selectFrom('user').selectAll().execute();
    return 'Hello World!';
  }
}
