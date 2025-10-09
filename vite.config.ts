import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const APP_PORT = Number(env.VITE_APP_BASE_PORT)
  const APP_OPEN = Boolean(env.VITE_APP_BASE_OPEN)
  const APP_HOST = Boolean(env.VITE_APP_BASE_HOST)
  const APP_STRICT_PORT = Boolean(env.VITE_APP_BASE_STRICT_PORT)

  const APP_GLOBAL = 'window'

  return {
    server: {
      open: APP_OPEN,
      port: APP_PORT,
      host: APP_HOST,
      strictPort: APP_STRICT_PORT,
    },
    define: { global: APP_GLOBAL },
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
        {
          find: '@components',
          replacement: resolve(__dirname, 'src/components'),
        },
        { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      ],
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
    }
  }
})
