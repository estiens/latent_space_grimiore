import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Use relative paths for deployment to any domain/subdirectory
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  server: {
    port: 4001, // Match port in package.json dev script
    host: true,
    hmr: {
      overlay: false,
    },
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
  },
});
