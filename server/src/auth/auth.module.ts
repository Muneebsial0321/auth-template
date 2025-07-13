import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [AuthController],
  exports: [JwtService],
  providers: [AuthService, JwtService, RolesGuard],
})
export class AuthModule { }
