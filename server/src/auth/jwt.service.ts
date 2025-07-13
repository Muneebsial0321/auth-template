import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';  // Changed this line
import { RequestUserType } from './guards/user.type';

@Injectable()
export class JwtService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret';
  private readonly expiresIn = '7d';

  sign(payload: RequestUserType): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(jwtToken: string) {
    const payload = jwt.verify(jwtToken, this.secret);
    if (payload) {
      return payload as RequestUserType
    }
    return null
  }
}
