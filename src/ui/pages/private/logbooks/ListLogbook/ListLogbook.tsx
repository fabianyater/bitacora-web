import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../hooks/useAuth";
import { getAllLogbooks } from "../../../../../services/endpoints/logbooks";
import { ILogBook } from "../../../../../utils/types/logbooksTypes";
import BotanicCard from "../../../../components/Card/Card";
import styles from "./styles.module.css";

export type ListLogbookProps = {};

const ListLogbook: React.FC<ListLogbookProps> = () => {
  const { auth } = useAuthContext();
  const [logbooks, setLogbooks] = useState<ILogBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogbooks = async () => {
      try {
        setLoading(true);
        if (auth.token) {
          const response = await getAllLogbooks(auth.token, 1, 10, "date");
          setLogbooks(response.content);
        }
      } catch (error) {
        console.error("Error fetching logbooks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogbooks();
  }, [auth.token]);

  if (loading) return <h1>Cargando Bitácoras</h1>;

  return (
    <div className={styles.cardContainer}>
      {logbooks.map((logbook) => (
        <BotanicCard
          key={logbook.title}
          path={logbook._id}
          title={logbook.title}
          commonName={logbook.collectedSpecies.commonName}
          date={logbook.date.toString()}
          humidity={logbook.weather.humidity}
          sampleImage={logbook.images[0].url}
          scientificName={logbook.collectedSpecies.scientificName ?? ""}
          temperature={logbook.weather.temperature}
          weatherType={logbook.weather.weatherType}
        />
      ))}
    </div>
  );
};

export default ListLogbook;
