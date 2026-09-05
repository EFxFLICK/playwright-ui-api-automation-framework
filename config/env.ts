import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: getRequiredEnv('BASE_URL'),
  apiBaseUrl: getRequiredEnv('API_BASE_URL'),
  testUserEmail: getRequiredEnv('TEST_USER_EMAIL'),
  testUserPassword: getRequiredEnv('TEST_USER_PASSWORD'),
};