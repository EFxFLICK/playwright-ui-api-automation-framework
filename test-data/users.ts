import { env } from '../config/env';

export const testUsers = {
  validUser: {
    email: env.testUserEmail,
    password: env.testUserPassword,
  },

  invalidUser: {
    email: 'invalid-user@example.com',
    password: 'InvalidPassword123!',
  },
};