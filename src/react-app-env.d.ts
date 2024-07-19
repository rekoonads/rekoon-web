declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
