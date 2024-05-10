// Nest Packages
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class RootExceptionFilter implements ExceptionFilter {
  private unknownCode = 'Unknown';

  catch(exception: any, host: ArgumentsHost) {}
}
