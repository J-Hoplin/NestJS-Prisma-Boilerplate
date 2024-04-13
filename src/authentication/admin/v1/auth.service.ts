// Nest Packages
import { Injectable } from '@nestjs/common';

// Custom Packages
import { AdminAuthV1Repository } from './auth.repository';

@Injectable()
export class AdminAuthV1Service {
  constructor(private readonly repository: AdminAuthV1Repository) {}
}
