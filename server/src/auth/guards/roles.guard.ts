import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User_Role } from 'generated/prisma';
import { JwtService } from '../jwt.service';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,

  ) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<User_Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      if (decoded) return requiredRoles.some((role) => decoded.role === role);
      return false
    } catch (err: unknown) {
      console.log({ err });
      return false;
    }
  }
}