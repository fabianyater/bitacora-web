import L from "leaflet";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import pinIcon from "../../../../assets/map-pin.svg";
import { useAuthContext } from "../../../../hooks/useAuth";
import {
  getLocations,
  ILocation,
} from "../../../../services/endpoints/logbooks";

import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Link } from "react-router-dom";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [22, 22],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const LocationsPage = () => {
  const { auth } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    async function getLocationsById() {
      setIsLoading(true);
      try {
        if (auth.token && auth.userId) {
          const response = await getLocations(auth.token, auth.userId);
          setLocations(response);
        }
      } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
        toast.error("Error al obtener las ubicaciones");
      } finally {
        setIsLoading(false);
      }
    }

    getLocationsById();
  }, [auth.token, auth.userId]);

  if (isLoading) return <h1>Cargando mapa...</h1>;

  return (
    <div>
      <Toaster position="top-right" />
      <h1 style={{ margin: "20px 0" }}>Mapa de ubicaciones</h1>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        zoom={2}
        maxZoom={18}
        minZoom={2}
        center={[0, 0]}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="ESRI Satellite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>
        </LayersControl>

        <MarkerClusterGroup>
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3>{location.city}</h3>
                  <p>Latitud: {location.latitude}</p>
                  <p>Longitud: {location.longitude}</p>
                  <Link to={`/logbooks/${location.logBookId}`}>
                    Ver detalles
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
