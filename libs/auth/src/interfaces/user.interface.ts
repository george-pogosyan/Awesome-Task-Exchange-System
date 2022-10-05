export interface IUser {
  id: string
  email: string
  role: 'worker' | 'manager' | 'admin'
}
