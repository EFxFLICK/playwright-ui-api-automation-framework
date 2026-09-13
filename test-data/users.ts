import { env } from '../config/env';
import { CreateUserData } from '../api/services/user.service';

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

export function createTestUser(): CreateUserData {
  const uniqueEmail = `qa_${Date.now()}@example.com`;

  return {
    name: 'QA Automation User',
    email: uniqueEmail,
    password: 'Test@12345',
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'QA',
    lastname: 'Automation',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Test Area',
    country: 'India',
    zipcode: '110001',
    state: 'Delhi',
    city: 'New Delhi',
    mobile_number: '9876543210',
  };
}