import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
});
