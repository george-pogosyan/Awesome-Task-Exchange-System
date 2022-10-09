export const USER_STREAM_TOPIC = 'user-stream'

export type UserCreatedMessage = {
  event: 'UserCreated',
  payload: {
    id: string,
    email: string,
    name: string,
    role: 'worker' | 'manager' | 'admin'
  }
}
