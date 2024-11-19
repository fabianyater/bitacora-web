export const getApiUrl = (): string | undefined => {
  if (import.meta.env.VITE_ENV === "dev") {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  } else {
    return import.meta.env.VITE_BACKEND_URL_PROD;
  }
};

export const getHeaderOptions = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    withCredentials: true,
  },
});

export const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};