export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}
