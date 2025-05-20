import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // host: "192.168.10.20",
    host: "0.0.0.0",
    port: 3050,
  },
});
