import React from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import styles from "./styles.module.css";

export type FilterOptions = {
  search: string;
  startDate: string;
  endDate: string;
  location: string;
  habitatType: string;
  climate: string;
  sortBy: "date" | "location" | "relevance";
};

export type FilterSidebarProps = {
  filters: FilterOptions;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <section className={styles.sidebar}>
      <Input
        label="Fecha de inicio"
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={onFilterChange}
        className={styles.dateInput}
      />

      <Input
        label="Fecha de fin"
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={onFilterChange}
        className={styles.dateInput}
      />

      <Input
        label="Ubicación"
        type="text"
        name="location"
        value={filters.location}
        onChange={onFilterChange}
        className={styles.textInput}
        placeholder="Ciudad, región..."
      />

      <Input
        label="Tipo de hábitat"
        type="text"
        name="habitatType"
        value={filters.habitatType}
        onChange={onFilterChange}
        className={styles.textInput}
        placeholder="Bosque, desierto..."
      />

      <Input
        label="Clima"
        type="text"
        name="climate"
        value={filters.climate}
        onChange={onFilterChange}
        className={styles.textInput}
        placeholder="Cálido, frío..."
      />

      <Select
        label="Ordenar por"
        name="sortBy"
        value={filters.sortBy}
        onChange={onFilterChange}
        options={[
          { label: "Fecha", value: "date" },
          { label: "Ubicación", value: "location" },
          { label: "Relevancia", value: "relevance" },
        ]}
      />
    </section>
  );
};

export default FilterSidebar;
