export class TokenAuthResponse {
  access_token: string;

  constructor(token: string) {
    this.access_token = token;
  }
}
