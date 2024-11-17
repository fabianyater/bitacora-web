import { FilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
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

type FilterSidebarProps = {
  onFilter: (filters: FilterOptions) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilter }) => {
  const { register, handleSubmit } = useForm<FilterOptions>();

  const handleFilter = (data: FilterOptions) => {
    onFilter(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFilter)}>
      <section className={styles.sidebar}>
        <Input
          label="Fecha de inicio"
          type="date"
          name="startDate"
          register={register}
          className={styles.dateInput}
        />

        <Input
          label="Fecha de fin"
          type="date"
          name="endDate"
          register={register}
          className={styles.dateInput}
        />

        <Input
          label="Ubicación"
          type="text"
          name="location"
          register={register}
          className={styles.textInput}
          placeholder="Ciudad, región..."
        />

        <Input
          label="Tipo de hábitat"
          type="text"
          name="habitatType"
          register={register}
          className={styles.textInput}
          placeholder="Bosque, desierto..."
        />

        <Input
          label="Clima"
          type="text"
          name="climate"
          register={register}
          className={styles.textInput}
          placeholder="Cálido, frío..."
        />

        <button type="submit" className={styles.button}>
          <FilterIcon />
        </button>
      </section>
    </form>
  );
};

export default FilterSidebar;
