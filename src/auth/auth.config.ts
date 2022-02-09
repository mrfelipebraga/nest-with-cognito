import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public userPoolId: string = process.env.COGNITO_USER_POOL_ID;

  public clientId: string = process.env.COGNITO_CLIENT_ID;
}
