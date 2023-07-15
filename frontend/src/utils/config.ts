export const SERVICE_URL: string = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_SERVICE_URL as string);
