import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project sites serve from /<repo>/. The workflow passes
  // BASE_PATH from actions/configure-pages (empty for custom domains).
  base: (process.env.BASE_PATH || '/').replace(/\/*$/, '/'),

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Extra extensions treated as static assets. Never list .css, .ts or .tsx.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
