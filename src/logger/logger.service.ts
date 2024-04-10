import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class GlobalLogger extends ConsoleLogger {}
