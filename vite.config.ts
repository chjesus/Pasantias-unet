import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const APP_PORT = Number(env.VITE_APP_BASE_PORT)

  return {
    server: { open: true, port: APP_PORT, host: true },
    define: { global: 'window' },
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
  }
})
