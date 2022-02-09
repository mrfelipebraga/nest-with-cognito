import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthConfig } from './auth.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthConfig],
})
export class AuthModule {}
