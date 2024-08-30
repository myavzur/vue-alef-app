import vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom'
    // setupFiles: './src/test/setup-tests.ts'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
