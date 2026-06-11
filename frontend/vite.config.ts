import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built app works whether FastAPI serves it from / or a
// subpath. During `npm run dev`, /api and /reports proxy to the backend.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://127.0.0.1:8000",
      "/reports": "http://127.0.0.1:8000",
    },
  },
});
