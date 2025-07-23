import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/route_optimizer_fe/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
