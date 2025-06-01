import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ['fs', 'path', 'os'], // prevent Vercel from choking
    }
  },
  define: {
    'process.env': {}, // required to avoid undefined errors on Vercel
  }
})
