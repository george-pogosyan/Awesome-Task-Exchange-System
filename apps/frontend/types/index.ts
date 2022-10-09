export type User = {
  email: string,
  name: string,
  role: 'worker' | 'manager' | 'admin',
}

export type LoginInfo = User & { accessToken: string }

export type Task = {
  id: string,
  title: string,
  description: string,
  assigner: Partial<User>
  isOpen: boolean
}