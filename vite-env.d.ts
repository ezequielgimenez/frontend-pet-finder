// vite-env.d.ts
interface ImportMetaEnv {
  VITE_TOKEN_MAPBOX: string;
  VITE_TOKEN_RESEND: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
