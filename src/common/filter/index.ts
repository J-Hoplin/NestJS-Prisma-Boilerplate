// Nest Packages
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// Third-party Packages
import { Request, Response } from 'express';

// Custom Packages
import { ExceptionPayload, RootException } from '../error';
import { ICommonResponse } from '../types';

@Catch()
export class RootExceptionFilter implements ExceptionFilter {
  private unknownCode = 'Unknown';

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request: Request = context.getRequest<Request>();
    const response: Response = context.getResponse<Response>();

    let responseStatusCode = 500;
    let responseErrorPayload: ExceptionPayload = {
      code: this.unknownCode,
      message: '',
    };

    // If exception is http exception instance
    if (exception instanceof HttpException) {
      // Response Message
      const response = exception.getResponse();
      // Response Status Code
      responseStatusCode = exception.getStatus();
      responseErrorPayload = {
        code: this.unknownCode,
        message: response,
      };
    }
    // Custom Exception
    else if (exception instanceof RootException) {
      // Response Message
      const response = exception.message;
      // Response Status Code
      const statusCode = exception.statuscode;
      responseErrorPayload = response;
      responseStatusCode = statusCode;
    }
    // Error
    else {
      const errorMessage = (exception as Error).message;
      // Response Status Code
      responseStatusCode = 500;
      // Response Message
      responseErrorPayload = {
        code: this.unknownCode,
        message: errorMessage,
      };
    }
    const exceptionResponse: ICommonResponse = {
      success: false,
      data: null,
      error: responseErrorPayload,
    };

    return response.status(responseStatusCode).json(exceptionResponse);
  }
}
