import { Injectable } from '@nestjs/common';
import { AdminAuthV1Repository } from './auth.repository';

@Injectable()
export class AdminAuthV1Service {
  constructor(private readonly repository: AdminAuthV1Repository) {}
}
