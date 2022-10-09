export const EVENT_AGGRAGATE = 'user';

export const KAFKA_INJECT_SYMBOL = Symbol('USER_SERVICE');

export const USER_ROLES: Record<IUSER_ROLE, IUSER_ROLE> = {
  worker: 'worker',
  manager: 'manager',
  admin: 'admin',
};

export type IUSER_ROLE = 'worker' | 'manager' | 'admin';
