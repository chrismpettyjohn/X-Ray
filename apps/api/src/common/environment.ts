import 'dotenv/config';

export function getEnvOrFail(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment token ${key}`);
  }

  return value;
}

// General
export const API_URL: string = getEnvOrFail('API_URL');

// Database
export const DATABASE_HOST: string = getEnvOrFail('DATABASE_HOST');
export const DATABASE_PORT = Number(getEnvOrFail('DATABASE_PORT'));
export const DATABASE_USER: string = getEnvOrFail('DATABASE_USER');
export const DATABASE_PASS: string = getEnvOrFail('DATABASE_PASS');
export const DATABASE_NAME: string = getEnvOrFail('DATABASE_NAME');
export const DATABASE_SSL: boolean = getEnvOrFail('DATABASE_SSL') === 'true';

// GraphQL
export const GRAPHQL_PLAYGROUND: boolean =
  getEnvOrFail('GRAPHQL_PLAYGROUND') === 'true';

// Authentication
export const JWT_SECRET: string = getEnvOrFail('JWT_SECRET');
export const JWT_EXPIRES = Number(getEnvOrFail('JWT_EXPIRES'));

// Google Recaptcha
export const GOOGLE_RECAPTCHA_SECRET_KEY = getEnvOrFail(
  'GOOGLE_RECAPTCHA_SECRET_KEY'
);
export const GOOGLE_MAPS_API_KEY = getEnvOrFail('GOOGLE_MAPS_API_KEY');

// HTTPS
export const HTTPS_CERT: string = getEnvOrFail('SSL_CRT_FILE');
export const HTTPS_KEY: string = getEnvOrFail('SSL_KEY_FILE');

export const ALLOWED_CORS_HOSTS: string[] =
  getEnvOrFail('ALLOWED_CORS_HOSTS').split(',');
