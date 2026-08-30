import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // @prometheusavatar/core uses Node's EventEmitter in its browser bundle.
    // Vite otherwise externalizes `events`, causing the app to crash on import.
    alias: {
      events: fileURLToPath(new URL('./src/eventEmitter.ts', import.meta.url)),
    },
  },
})
