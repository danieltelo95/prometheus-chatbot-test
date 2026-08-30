import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // @prometheusavatar/core uses Node's EventEmitter in its browser bundle.
    // Vite otherwise externalizes `events`, causing the app to crash on import.
    alias: [
      {
        find: /^events$/,
        replacement: fileURLToPath(new URL('./src/eventEmitter.ts', import.meta.url)),
      },
      {
        // The configured model is Cubism 3/4. The universal bundle also
        // initializes Cubism 2 and crashes unless legacy live2d.min.js exists.
        find: /^pixi-live2d-display$/,
        replacement: 'pixi-live2d-display/cubism4',
      },
    ],
  },
})
