import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

import { AuthConfig } from './auth.config';
import {
  AuthRegisterDto,
  AuthCredentialsDto,
  AuthCofirmationDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  registerUser({ username, email, password }: AuthRegisterDto) {
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, res) => {
          if (err) reject(err);

          resolve(res);
        },
      );
    });
  }

  authenticateUser({ username, password }: AuthCredentialsDto) {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const newUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (res) => resolve(res),
        onFailure: (err) => reject(err),
      });
    });
  }

  codeConfirmation({ token, username }: AuthCofirmationDto) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      return cognitoUser.confirmRegistration(token, true, (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  }
}
