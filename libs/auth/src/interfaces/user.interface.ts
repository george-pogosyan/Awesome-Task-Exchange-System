export interface IUser {
  id: string
  email: string
  name: string
  role: 'worker' | 'manager' | 'admin'
}
