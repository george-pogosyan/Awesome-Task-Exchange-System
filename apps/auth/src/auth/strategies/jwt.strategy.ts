import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      secretOrKey: 'secret',
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<IUser> {
    const user = await this.authService.validateUser(jwtPayload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
