import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IUser } from '../user/interfaces/user.interface';
import Cryptr = require('cryptr');
import { UserService } from '../user/user.service';
import { IUSER_ROLE } from '../user/constants';

@Injectable()
export class AuthService {
  #logger = new Logger(AuthService.name);

  cryptr: any;

  constructor(private readonly userService: UserService) {
    this.cryptr = new Cryptr('secret');
  }

  async createAccessToken(userId: string): Promise<string> {
    return sign({ _id: userId }, 'secret', {
      expiresIn: 6048000,
    });
  }

  async validateUser(jwtPayload: JwtPayload): Promise<IUser> {
    const id = jwtPayload?.userId ? jwtPayload.userId : jwtPayload._id;
    const user = await this.userService.findUserById(id);
    this.#logger.log(JSON.stringify(user));
    if (!user) {
      return null;
    }
    return user;
  }

  private jwtExtractor(request: any) {
    let token = null;
    if (request.header('Authorization')) {
      token = request.get('Authorization').split(' ')[1];
    }
    return token;
  }

  returnJwtExtractor(): MethodDecorator {
    return this.jwtExtractor;
  }

  async createNewUser(params: {
    email: string;
    name: string;
    password: string;
    role: IUSER_ROLE;
  }) {
    await this.userService.createNewUser(params);
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new NotFoundException('User not found');
    if (!user.checkPasswordMatch(password))
      throw new NotFoundException('User not found');

    return {
      email: user.email,
      name: user.name,
      role: user.role,
      accessToken: await this.createAccessToken(user.id),
    };
  }
}
