import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    // removed: runtimeErrorOverlay, cartographer (Replit-only)
  ],
  resolve: {
    alias: {
  // Simplify alias to point to the actual src directory
  "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Use the project root (default) so Vercel's Vite detection works without extra config.
  // Keep standard dist output so Vercel serves /dist automatically.
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  }
});
