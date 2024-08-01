import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

export default defineConfig(({ mode }) => {
  // Acceder a las variables de entorno cargadas
  const env = {
    VITE_TOKEN_MAPBOX: process.env.VITE_TOKEN_MAPBOX,
    VITE_TOKEN_RESEND: process.env.VITE_TOKEN_RESEND,
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
  };

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
      // Definir variables de entorno globalmente si es necesario
      "process.env": env,
    },
  };
});
