import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  AuthRegisterDto,
  AuthCredentialsDto,
  AuthCofirmationDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerRequest: AuthRegisterDto) {
    if (
      registerRequest.password.length < 8 ||
      !/[a-z]/.test(registerRequest.password) ||
      !/[A-Z]/.test(registerRequest.password) ||
      !/[0-9]/.test(registerRequest.password)
    ) {
      throw new BadRequestException('Password requirements not met.');
    }
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('authenticate')
  async login(@Body() authenticateRequest: AuthCredentialsDto) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() comfirnRequest: AuthCofirmationDto) {
    try {
      return await this.authService.codeConfirmation(comfirnRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
