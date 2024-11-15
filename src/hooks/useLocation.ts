import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { LogbookRequest } from "../utils/types/logbooksTypes";

const useLocation = () => {
  const { setValue } = useFormContext<LogbookRequest>();

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address.city || "Ubicación desconocida";
            setValue("location.city", city);
          } catch (error) {
            console.error("Error al obtener la ciudad:", error);
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("Geolocalización no es compatible en este navegador");
    }
  }, [setValue]);

  return getLocation;
};

export default useLocation;
