import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../../../hooks/useAuth";
import { getLogbookById } from "../../../../../services/endpoints/logbooks";
import { ILogBook } from "../../../../../utils/types/logbooksTypes";
import styles from "./styles.module.css";

const Details = () => {
  const { userId } = useParams<{ userId: string }>();
  const { auth } = useAuthContext();
  const [logbook, setLogbook] = useState<ILogBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) return <h1>Cargando Detalle de la Bitácora...</h1>;
  if (!logbook) return <h1>No se encontró la bitácora.</h1>;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.headerSection}>
        <h1>{logbook.title}</h1>
        <p className={styles.date}>
          <strong>Fecha:</strong> {new Date(logbook.date).toLocaleDateString()}
        </p>
      </div>

      <div className={styles.card}>
        <section className={styles.section}>
          <h2>Ubicación</h2>
          <p>
            Latitud: {logbook.location.latitude}, Longitud:{" "}
            {logbook.location.longitude}
          </p>
        </section>

        <section className={styles.section}>
          <h2>Clima</h2>
          <div className={styles.climateInfo}>
            <p>
              <strong>Tipo:</strong> {logbook.weather.weatherType}
            </p>
            <p>
              <strong>Temperatura:</strong> {logbook.weather.temperature}°C
            </p>
            <p>
              <strong>Humedad:</strong> {logbook.weather.humidity}%
            </p>
            <p>
              <strong>Viento:</strong> {logbook.weather.windSpeed} m/s
            </p>
            <p>
              <strong>Hora de Muestreo:</strong>{" "}
              {new Date(logbook.weather.samplingTime).toLocaleTimeString()}
            </p>
          </div>
        </section>
      </div>

      <div className={styles.card}>
        <section className={styles.section}>
          <h2>Hábitat</h2>
          <p>
            <strong>Tipo de Vegetación:</strong>{" "}
            {logbook.habitat.vegetationType}
          </p>
          <p>
            <strong>Altitud:</strong> {logbook.habitat.altitude} m
          </p>
          <p>
            <strong>Tipo de Suelo:</strong> {logbook.habitat.soilType}
          </p>
          <p>
            <strong>Clima:</strong> {logbook.habitat.climate}
          </p>
          <p>
            <strong>Notas:</strong> {logbook.habitat.notes}
          </p>
        </section>
      </div>

      <div className={styles.speciesCard}>
        <h2>Especie Colectada</h2>
        <div className={styles.speciesInfo}>
          <p>
            <strong>Nombre Científico:</strong>{" "}
            {logbook.collectedSpecies.scientificName}
          </p>
          <p>
            <strong>Nombre Común:</strong> {logbook.collectedSpecies.commonName}
          </p>
          <p>
            <strong>Familia:</strong> {logbook.collectedSpecies.family}
          </p>
          <p>
            <strong>Muestras:</strong> {logbook.collectedSpecies.sampleQuantity}
          </p>
          <p>
            <strong>Estado:</strong> {logbook.collectedSpecies.plantStatus}
          </p>
          {logbook.collectedSpecies.photos.map((photo) => (
            <div key={photo.url} className={styles.photoContainer}>
              <img
                src={photo.url}
                alt={photo.description}
                className={styles.photo}
              />
              <p>{photo.description}</p>
              <p>
                <em>Por:</em> {photo.photographer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.imagesSection}>
        <h2>Imágenes del Área de Muestreo</h2>
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
              <p>
                <strong>{image.description ?? "Sin descripción"}</strong>
              </p>
              <p>
                <em>Fotógrafo:</em> {image.photographer ?? "Desconocido"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.observationsSection}>
        <h2>Observaciones Adicionales</h2>
        <p>{logbook.additionalObservations}</p>
      </div>
    </div>
  );
};

export default Details;
