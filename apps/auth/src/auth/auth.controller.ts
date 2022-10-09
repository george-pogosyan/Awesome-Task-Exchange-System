import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUSER_ROLE } from 'src/user/constants';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserData, IUser, RolesGuard } from '@lib/auth';
import { Logger } from '@nestjs/common';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  #logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('validate-user-jwt-token')
  async validateJwtToken(@Payload() jwtPayload: JwtPayload) {
    const user = await this.authService.validateUser(jwtPayload);
    this.#logger.log({ jwtPayload, user });
    return JSON.parse(JSON.stringify(user));
  }

  @Post('register')
  async registerNewUser(
    @Body()
    params: {
      email: string;
      name: string;
      password: string;
      role: IUSER_ROLE;
    },
  ) {
    await this.authService.createNewUser(params);
  }

  @Post('login')
  async loginUser(@Body() params: { email: string; password: string }) {
    return await this.authService.loginUser(params);
  }

  @Get('')
  @UseGuards(RolesGuard)
  async getUserData(@UserData() user: IUser) {
    this.#logger.log(JSON.stringify(user));
    return user;
  }
}
