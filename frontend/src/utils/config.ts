export const SERVICE_URL: string = import.meta.env.DEV
  ? "http://localhost:3001"
  : (process.env.BACKEND_BASE_URL as string);
