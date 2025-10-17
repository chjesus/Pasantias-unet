import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.svg', 'masked-icon.svg'],
        manifest: {
          name: 'Krix App - Servicios Online',
          short_name: 'Krix App',
          description: 'Plataforma de contratacion de servicios en linea.',
          theme_color: '#1976d2',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
          icons: [
            {
              src: 'pwa-192x192.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: 'pwa-512x512.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            },
            {
              src: 'pwa-512x512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          sourcemap: false,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/duub8e3vnc\.execute-api\.us-east-1\.amazonaws\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24, // 24 horas
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
                },
              },
            },
          ]
        },
        devOptions: {
          enabled: true,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        }
      })
    ],
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
