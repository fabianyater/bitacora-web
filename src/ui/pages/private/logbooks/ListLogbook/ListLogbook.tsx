import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../../hooks/useAuth";
import { getAllLogbooks } from "../../../../../services/endpoints/logbooks";
import { ILogBook } from "../../../../../utils/types/logbooksTypes";
import BotanicCard from "../../../../components/Card/Card";
import FilterSidebar, {
  FilterOptions,
} from "../../../../components/FilterSidebar/FilterSidebar";
import LoadingPage from "../../../../pages/public/LoadingPage/LoadingPage";
import styles from "./styles.module.css";

const ListLogbook = () => {
  const { auth } = useAuthContext();
  const [logbooks, setLogbooks] = useState<ILogBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    startDate: "",
    endDate: "",
    location: "",
    habitatType: "",
    climate: "",
    sortBy: "date",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

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

  if (loading) return <LoadingPage text="Cargando Bitácoras" />;
  if (!logbooks.length) return <h1>No hay bitácoras disponibles</h1>;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por título, especie, ubicación..."
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <button className={styles.searchButton}>Buscar</button>
        </div>

        <FilterSidebar filters={filters} onFilterChange={handleInputChange} />
      </header>
      <section>
        <div className={styles.title}>
          <h1 className={styles.title}>Centro de Bitácoras</h1>

          <Link to="/logbooks/new">
            <button className={styles.newButton}>
              <Plus />
              Nueva Bitácora
            </button>
          </Link>
        </div>
        {loading && <LoadingPage text="Cargando Bitácoras" />}
        <div className={styles.cardContainer}>
          {logbooks.map((logbook) => (
            <BotanicCard
              key={logbook.title}
              path={logbook._id}
              title={logbook.title}
              commonName={logbook.collectedSpecies[0].commonName}
              date={logbook.date.toString()}
              humidity={logbook.weather.humidity}
              //sampleImage={logbook.images[0].url}
              scientificName={logbook.collectedSpecies[0].scientificName ?? ""}
              temperature={logbook.weather.temperature}
              weatherType={logbook.weather.weatherType}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ListLogbook;
