import { JwtPayload } from './../interfaces/jwt-payload.interface'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Request } from 'express'
import { IUser } from '../interfaces/user.interface'
import { AuthServiceAdapter } from '../adapters/auth-service.adapter'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  #logger = new Logger(JwtStrategy.name)
  constructor(
    private readonly authServiceAdapter: AuthServiceAdapter
  ) {
    super({
      jwtFromRequest: (request: Request) => {
        if (request.header('Authorization') && request.get('Authorization').split(' ')[1]) {
          return request.get('Authorization').split(' ')[1]
        }
        return null
      },
      secretOrKey: 'secret',
    })
  }

  async validate(jwtPayload: JwtPayload): Promise<IUser> {
    // TODO: send request throw kafka to auth service for validation of jwt token
    const user = await this.authServiceAdapter.validateUser(jwtPayload)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
