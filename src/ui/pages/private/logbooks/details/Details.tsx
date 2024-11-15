import {
  ArrowLeft,
  CloudSunRain,
  Leaf,
  MapPin,
  MessageCircle,
  Pencil,
  TreeDeciduous,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../../hooks/useAuth";
import { getLogbookById } from "../../../../../services/endpoints/logbooks";
import { ILogBook } from "../../../../../utils/types/logbooksTypes";
import CardInfo from "../../../../components/CardInfo/CardInfo";
import LoadingPage from "../../../../pages/public/LoadingPage/LoadingPage";
import styles from "./styles.module.css";

const Details = () => {
  const { userId } = useParams<{ userId: string }>();
  const { auth } = useAuthContext();
  const [logbook, setLogbook] = useState<ILogBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogbookDetail = async () => {
      try {
        setLoading(true);
        if (auth.token && userId) {
          const response = await getLogbookById(auth.token, userId);
          setLogbook(response);
        }
      } catch (error) {
        console.error("Error fetching logbook detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogbookDetail();
  }, [auth.token, userId]);

  if (loading) return <LoadingPage text="Cargando Detalle de la Bitácora..." />;
  if (!logbook) return <h1>No se encontró la bitácora.</h1>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <Link to={`/logbooks/${userId}/edit`}>
          <button>
            <Pencil />
          </button>
        </Link>
      </div>
      <header className={styles.header}>
        <h1>{logbook.title}</h1>
        <p className={styles.date}>
          Creada el{" "}
          {new Date(logbook.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <main className={styles.main}>
        <CardInfo icon={<CloudSunRain />} title="Condiciones climáticas">
          <p className={styles.label}>
            Temperatura: <span>{logbook.weather.temperature}°C</span>
          </p>
          <p className={styles.label}>
            Humedad: <span>{logbook.weather.humidity}%</span>
          </p>
          <p className={styles.label}>
            Viento: <span>{logbook.weather.windSpeed}m/s</span>
          </p>
          <p className={styles.label}>
            Tipo de clima: <span>{logbook.weather.weatherType}</span>
          </p>
          <p className={styles.label}>
            Hora de muestreo:{" "}
            <span>
              {new Date(logbook.weather.samplingTime).toLocaleTimeString()}
            </span>
          </p>
        </CardInfo>
        <CardInfo icon={<MapPin />} title="Ubicación">
          <p className={styles.label}>
            Coordenadas: <span>{logbook.location.latitude}</span>,{" "}
            <span>{logbook.location.longitude}</span>
          </p>
        </CardInfo>
        <CardInfo icon={<TreeDeciduous />} title="Hábitat">
          <p>{logbook.habitat.notes}</p>
          <p className={styles.label}>
            Tipo de vegetación: <span>{logbook.habitat.vegetationType}</span>
          </p>
          <p className={styles.label}>
            Altitud: <span>{logbook.habitat.altitude}m</span>
          </p>
          <p className={styles.label}>
            Tipo de suelo: <span>{logbook.habitat.soilType}</span>
          </p>
          <p className={styles.label}>
            Clima: <span>{logbook.habitat.climate}</span>
          </p>
        </CardInfo>
        <CardInfo icon={<Leaf />} title="Especies Recolectadas">
          <p>
            Especies vegetales notables observadas y recogidas durante la
            expedición
          </p>
          {logbook.collectedSpecies.map((species) => (
            <div key={species.scientificName} className={styles.speciesCard}>
              <div className={styles.photosContainer}>
                {species.photos.map((photo) => (
                  <img
                    key={photo.url}
                    src={photo}
                    alt={`Imagen de ${species.scientificName}`}
                    className={styles.speciesPhoto}
                  />
                ))}
              </div>
              <div className={styles.speciesInfo}>
                <h2 className={styles.speciesName}>
                  {species.scientificName} <span>({species.commonName})</span>
                </h2>
                <p>{species.family}</p>
                <p>{species.sampleQuantity}</p>
                <p>{species.plantStatus}</p>
              </div>
            </div>
          ))}
        </CardInfo>
        <CardInfo title="Imagenes del Área de Muestreo">
          <p>Documentación visual del área de muestreo</p>
          <div className={styles.imageGallery}>
            {logbook.images.map((image) => (
              <div key={image.url} className={styles.imageCard}>
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.description ?? "Imagen de muestreo"}
                  />
                ) : (
                  <div className={styles.noImage}>Imagen no disponible</div>
                )}
              </div>
            ))}
          </div>
        </CardInfo>
        <CardInfo icon={<MessageCircle />} title="Observaciones Adicionales">
          <p>{logbook.additionalObservations}</p>
        </CardInfo>
      </main>
    </div>
  );
};

export default Details;
