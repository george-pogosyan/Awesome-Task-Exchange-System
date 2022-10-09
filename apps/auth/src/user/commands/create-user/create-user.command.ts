import { IUSER_ROLE } from 'src/user/constants';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly role: IUSER_ROLE,
  ) {}
}
