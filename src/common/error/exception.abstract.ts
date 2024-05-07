import { ICommonResponse } from '@app/types';
import { HttpStatus } from '@nestjs/common';
import { ExceptionPayload } from './type';

export abstract class RootException {
  private unknownCode = 'Unknown';

  public payload: ICommonResponse;
  public statusCode: HttpStatus;

  constructor(message: ExceptionPayload, statuscode: HttpStatus) {
    this.payload = {
      success: false,
      data: message,
    };
    this.statusCode = statuscode;
  }
}
