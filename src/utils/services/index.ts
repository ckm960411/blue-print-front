export const API_ROUTE_BASE_URL =
  typeof window === "undefined"
    ? process.env.API_ROUTE_BASE_URL
    : process.env.NEXT_PUBLIC_API_ROUTE_BASE_URL;
