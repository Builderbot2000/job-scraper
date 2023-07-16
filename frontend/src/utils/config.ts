export const SERVICE_URL: string = import.meta.env.DEV
  ? "http://localhost:3001"
  : (import.meta.env.VITE_SERVICE_URL as string);
