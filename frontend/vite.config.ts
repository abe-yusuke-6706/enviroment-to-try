import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',      // 外部アクセス可能に
    port: 5173,
    watch: {
      usePolling: true,   // Docker でファイル変更を検知させる
    },
    hmr: {
      protocol: 'ws',     // WebSocket
      host: 'localhost',  // ホストマシンのアドレス（必要に応じて Docker の IP）
      port: 5173,
    },
  },
})
