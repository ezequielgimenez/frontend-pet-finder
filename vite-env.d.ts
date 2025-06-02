// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_TOKEN_MAPBOX: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
