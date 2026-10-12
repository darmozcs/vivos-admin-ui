import path from 'path'
import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const DEFAULT_AUTH_TARGET = 'http://localhost:8080'
const DEFAULT_VIVOS_TARGET = 'http://localhost:8082'

// The browser's Origin (any dev port) would make the backends' CORS filter reject the call.
// Through the proxy the call is same-origin, so the header is dropped.
const sameOriginProxy = (target: string): ProxyOptions => ({
  target,
  changeOrigin: true,
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'))
  },
})

// https://vitejs.dev/config/
// In production the app is served behind Traefik under /vivo-admin (see nginx.conf).
const PRODUCTION_BASE = '/vivo-admin/'

export default defineConfig(({ command, mode }) => {
  // Empty prefix: also reads the non-VITE_ proxy targets (they never reach the bundle).
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Local dev stays at the root; the build uses the production sub-path.
    base: command === 'build' ? PRODUCTION_BASE : '/',
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    // Local dev with VITE_API_BASE_URL empty: same-origin calls, no CORS needed.
    server: {
      proxy: {
        '/auth': sameOriginProxy(env.DEV_AUTH_TARGET || DEFAULT_AUTH_TARGET),
        '/vivos-api': sameOriginProxy(env.DEV_VIVOS_TARGET || DEFAULT_VIVOS_TARGET),
      },
    },
  }
})
