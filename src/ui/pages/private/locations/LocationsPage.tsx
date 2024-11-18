import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../../../hooks/useAuth";
import { getLocations } from "../../../../services/endpoints/logbooks";

export const LocationsPage = () => {
  const { auth } = useAuthContext();

  useEffect(() => {
    async function getLocationsById() {
      try {
        if (auth.token && auth.userId) {
          await getLocations(auth.token, auth.userId);
        }
      } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
        toast.error("Error al obtener las ubicaciones");
      }
    }

    getLocationsById();
  }, [auth.token, auth.userId]);

  return (
    <div>
      <Toaster position="top-right" />
      <h1>Aquí va un mapa</h1>
    </div>
  );
};
