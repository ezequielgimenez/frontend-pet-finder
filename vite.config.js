import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      router: path.resolve(__dirname, "src/router"),
      ui: path.resolve(__dirname, "src/ui"),
      hooks: path.resolve(__dirname, "src/hooks"),
      lib: path.resolve(__dirname, "src/lib"),
    },
  },
});
