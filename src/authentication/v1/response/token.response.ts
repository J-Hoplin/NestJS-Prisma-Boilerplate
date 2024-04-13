// Nest Packages
import { ApiProperty } from '@nestjs/swagger';

export class TokenAuthResponse {
  @ApiProperty()
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}
