import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
