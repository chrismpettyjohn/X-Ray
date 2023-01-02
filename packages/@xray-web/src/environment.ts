export const GOOGLE_RECAPTCHA_CLIENT_KEY = import.meta.env
  .VITE_GOOGLE_RECAPTCHA_CLIENT_KEY!;

if (!GOOGLE_RECAPTCHA_CLIENT_KEY) {
  throw new Error('VITE_GOOGLE_RECAPTCHA_CLIENT_KEY is a required env value');
}

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('VITE_GOOGLE_MAPS_API_KEY is a required env value');
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is a required env value');
}
