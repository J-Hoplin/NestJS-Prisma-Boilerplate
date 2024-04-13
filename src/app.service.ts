// Nest Pacakges
import { Injectable } from '@nestjs/common';

// Custom Packages
import { ExampleQuery } from './dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Example user findMany
  listExample(qs: ExampleQuery) {
    return this.prisma.user.findMany({
      skip: qs.page * qs.limit,
      take: qs.limit,
      orderBy: {
        createdAt: qs.order,
      },
    });
  }
}
