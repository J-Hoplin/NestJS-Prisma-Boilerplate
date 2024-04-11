import { Injectable } from '@nestjs/common';
import { UserAuthV1Repository } from './user.repository';

@Injectable()
export class UserAuthV1Service {
  constructor(private readonly repository: UserAuthV1Repository) {}

  async signup() {}

  async signin() {}
}
