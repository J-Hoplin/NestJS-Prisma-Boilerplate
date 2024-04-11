import { AuthGuard } from '@nestjs/passport';
import { LOCAL } from './strategy/stretegy.token';

export class LocalGuard extends AuthGuard(LOCAL) {}
