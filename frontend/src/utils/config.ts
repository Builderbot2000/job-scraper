export const SERVICE_URL: string = import.meta.env.DEV
  ? "http://localhost:3001"
  : (import.meta.env.VITE_BACKEND_BASE_URL as string);
