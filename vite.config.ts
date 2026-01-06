import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@/components": path.resolve(__dirname, "components"),
      "@/lib": path.resolve(__dirname, "lib"),
      "@/pages": path.resolve(__dirname, "pages"),
      "@/types": path.resolve(__dirname, "types"),
      "@/data": path.resolve(__dirname, "data"),
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false,
    },
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
  },
});
