import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    server: {
      port: 5173,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'axios']
          }
        }
      },
      // Bundle analysis
      ...(mode === 'analyze' && {
        rollupOptions: {
          external: [],
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                return 'vendor'
              }
              if (id.includes('src/components')) {
                return 'components'
              }
              if (id.includes('src/services')) {
                return 'services'
              }
            }
          }
        }
      })
    },
    preview: {
      port: 4173,
      open: true
    },
    // Base URL for GitHub Pages deployment
    base: process.env.NODE_ENV === 'production' ? '/movie-music-explorer/' : '/'
  }
})
