import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    https: {
      key: '../ssl/key.pem',
      cert: '../ssl/cert.pem'
    },
  },
  plugins: [react()],
})
