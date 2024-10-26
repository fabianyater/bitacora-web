export const getApiUrl = (): string | undefined => {
  if (process.env.REACT_APP_ENV === "dev") {
    return process.env.REACT_APP_BACKEND_URL_DEV;
  } else {
    return process.env.REACT_APP_BACKEND_URL_PROD;
  }
};

export const getHeaderOptions = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
