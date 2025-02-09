/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: './test-setup.ts',
    css: true,
    include: ["**/*.{test,spec}.{ts,tsx}"],
  },
})
