import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    https: {
      key: '../ssl/key.pem',
      cert: '../ssl/cert.pem',
    },
  },
  plugins: [tsconfigPaths(), react()],
});
