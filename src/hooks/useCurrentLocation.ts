import { useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationError = {
  code: number;
  message: string;
};

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<GeolocationError | string | null>(null);

  const requestLocation = () => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocalización no soportada en el navegador actual");
      return;
    }

    geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        setLocation({
          latitude,
          longitude,
        });
        setError(null); 
      },
      (err: GeolocationPositionError) => {
        setError({
          code: err.code,
          message: err.message,
        });
      },
      options
    );
  };

  return { location, error, requestLocation };
};

export default useCurrentLocation;
