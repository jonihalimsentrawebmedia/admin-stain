import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()] as PluginOption[],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          tiptap: ['@tiptap/react', '@tiptap/core', '@tiptap/starter-kit'],
          pdf: ['pdfmake', 'html-to-pdfmake'],
          firebase: ['firebase/app', 'firebase/messaging'],
        },
      },
    },
  },
})
