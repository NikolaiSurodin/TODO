import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig( {
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath( new URL( './src', import.meta.url ) ),
      '@components': fileURLToPath( new URL( './src/components', import.meta.url ) ),
      '@views': fileURLToPath( new URL( './src/views', import.meta.url ) ),
      '@assets': fileURLToPath( new URL( './src/assets', import.meta.url ) ),
      '@helpers': fileURLToPath( new URL( './src/helpers', import.meta.url ) ),
      '@services': fileURLToPath( new URL( './src/services', import.meta.url ) ),
      '@const': fileURLToPath( new URL( './src/const', import.meta.url ) ),
      '@classes': fileURLToPath( new URL( './src/classes', import.meta.url ) ),
    }
  },
  server: {
    host: true
  }
} )
