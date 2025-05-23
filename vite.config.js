import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss(), 
    VitePWA({ 
      registerType: 'autoUpdate', 
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Password Utility',
        short_name: 'App',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        icons: [
          {
            src: '/icons/icon-256x256.png',
            sizes: '320x320',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '640x640',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
