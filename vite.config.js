import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd());

  return {
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
    define: {
      // Solo si necesitas definir variables globales en `process.env`
      "process.env": { ...env },
    },
  };
});
