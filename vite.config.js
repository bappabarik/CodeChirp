import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // 🔥 Required for service worker & manifest in dev mode
      },
      manifest: {
        name: "CodeChirp AI",
        short_name: "codechirp",
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#000000",
        icons: [
          {
            src: "/CodeChirp.png",
            sizes: "500x500",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot1.png",
            sizes: "2116x1155",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshot2.png",
            sizes: "553x1001",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
