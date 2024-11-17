import { ChevronLeft, ChevronRight, FilterX, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../../hooks/useAuth";
import {
  filterLogbooks,
  getAllLogbooks,
} from "../../../../../services/endpoints/logbooks";
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
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const getPaginatedLogBooks = async (
    token: string,
    page: number,
    size: number
  ) => {
    const response = await getAllLogbooks(token, page, size, "date");
    setLogbooks(response.content);
    setTotalPages(response.totalPages);
    setCurrentPage(response.pageNumber);
  };

  const handleFilter = async (filters: FilterOptions) => {
    setLoading(true);
    try {
      if (auth.token) {
        const response = await filterLogbooks(
          auth.token,
          filters.startDate,
          filters.endDate,
          filters.location,
          filters.habitatType,
          filters.climate,
          "date"
        );
        setLogbooks(response);
        setIsFiltered(true);
      }
    } catch (error) {
      console.error("Error al filtrar las bitácoras:", error);
      toast.error("Error al filtrar las bitácoras:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLogbooks = async () => {
      try {
        setLoading(true);
        if (auth.token) {
          await getPaginatedLogBooks(auth.token, currentPage, size);
        }
      } catch (error) {
        console.error("Error fetching logbooks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogbooks();
  }, [auth.token, currentPage, size]);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    if (auth.token) {
      await getPaginatedLogBooks(auth.token, page, size);
    }
    setLoading(false);
  };

  const handleClearFilter = () => {
    setIsFiltered(false);
    setLoading(true);
    if (auth.token) {
      getPaginatedLogBooks(auth.token, currentPage, size);
    }
    setLoading(false);
  };

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
              className={styles.input}
            />
          </div>
          <button className={styles.searchButton}>Buscar</button>
        </div>

        <FilterSidebar onFilter={handleFilter} />
      </header>
      {isFiltered && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p className={styles.filterMessage}>
            Mostrando resultados filtrados ({logbooks.length})
          </p>
          <button className={styles.button} onClick={handleClearFilter}>
            Limpiar filtros
            <FilterX className={styles.filterIcon} />
          </button>
        </div>
      )}
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
        {!loading && logbooks.length === 0 && (
          <div className={styles.noResults}>
            <h1>No hay bitácoras disponibles</h1>
          </div>
        )}

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
        {!isFiltered && (
          <div className={styles.pagination}>
            <button
              className={styles.button}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft />
              Anterior
            </button>
            {totalPages > 1 &&
              [...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${styles.button} ${
                    i + 1 === currentPage ? styles.active : styles.inactive
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            <button
              disabled={currentPage === totalPages}
              className={styles.button}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
              <ChevronRight />
            </button>
          </div>
        )}
      </section>
    </section>
  );
};

export default ListLogbook;
