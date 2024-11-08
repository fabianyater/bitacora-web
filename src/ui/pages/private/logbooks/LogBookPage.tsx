import { useState } from "react";
import { Outlet } from "react-router-dom";
import FilterSidebar, {
  FilterOptions,
} from "../../../components/FilterSidebar/FilterSidebar";
import Input from "../../../components/Input/Input";
import styles from "./styles.module.css";

export const LogBookPage = () => {
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

  return (
    <>
      <header className={styles.header}>
        <div className={styles.searchContainer}>
          <Input
            label="🔎 Buscar"
            type="search"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            className={styles.searchInput}
            placeholder="Buscar por título, especie, ubicación..."
          />
        </div>
      </header>

      <section className={styles.wrapper}>
        <FilterSidebar filters={filters} onFilterChange={handleInputChange} />
        <section>
          <h1 className={styles.title}>Centro de Bitácoras</h1>
          <Outlet />
        </section>
      </section>
    </>
  );
};
