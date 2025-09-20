import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@radix-ui/react-slot',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-progress',
      '@radix-ui/react-dialog',
      '@radix-ui/react-avatar',
      'clsx',
      'class-variance-authority',
      'tailwind-merge'
    ],
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
