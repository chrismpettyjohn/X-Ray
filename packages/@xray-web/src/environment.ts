function getEnvironmentOrFail(key: string): string {
  const value = process.env[`REACT_APP_${key}`];
  if (!value) {
    throw new Error(`Environment var REACT_APP_${key} does not exist`);
  }
  return value;
}

export const GOOGLE_RECAPTCHA_CLIENT_KEY = getEnvironmentOrFail(
  'GOOGLE_RECAPTCHA_CLIENT_KEY'
);

export const GOOGLE_MAPS_API_KEY = getEnvironmentOrFail('GOOGLE_MAPS_API_KEY');
