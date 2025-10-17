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
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
        '/metrics': {
          target: 'https://pq7cyoqls5.execute-api.us-east-1.amazonaws.com/prod-metric-krix',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/metrics/, '/metrics')
        },
      },
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            mui: ['@mui/material', '@mui/icons-material'],
            router: ['react-router'],
            utils: ['axios', 'zustand'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
