export const getApiUrl = (): string | undefined => {
  if (import.meta.env.VITE_ENV === "dev") {
    console.log("object");
    return import.meta.env.VITE_BACKEND_URL_DEV;
  } else {
    return import.meta.env.VITE_BACKEND_URL_PROD;
  }
};

export const getHeaderOptions = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
