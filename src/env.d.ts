/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_GITHUB_DEFAULT_REPO: string;
  readonly VITE_GITHUB_DEFAULT_PERSON: string;
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
