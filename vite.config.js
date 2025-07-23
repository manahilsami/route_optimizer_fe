import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import ghPages from "vite-plugin-gh-pages";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/route_optimizer_fe/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
