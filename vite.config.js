import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'MODI',
        short_name: 'MODI',

        start_url: '/',
        display: 'standalone',

        theme_color: '#55B89A',
        background_color: '#FFFFFF',

        share_target: {
          action: '/recipe/link',
          method: 'GET',
          enctype: 'application/x-www-form-urlencoded',

          params: {
            title: 'title',
            text: 'text',
            url: 'url',
          },
        },
      },
    }),
  ],
})