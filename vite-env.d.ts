// vite-env.d.ts
interface ImportMetaEnv {
  VITE_TOKEN_MAPBOX: string;
  VITE_TOKEN_RESEND: string;
  VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
