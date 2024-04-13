// Nest Packages
import { Injectable } from '@nestjs/common';

// Custom Packages
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class AdminAuthV1Repository {
  constructor(private readonly prisma: PrismaService) {}
}
