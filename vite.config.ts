import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'date-vendor': ['date-fns'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            'class-variance-authority',
            'clsx',
            'lucide-react'
          ]
        }
      }
    }
  }
});