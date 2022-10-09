import { IUSER_ROLE } from '../constants';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: IUSER_ROLE;
}
