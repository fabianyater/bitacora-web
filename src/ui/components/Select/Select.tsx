import React from "react";
import styles from "./Select.module.css";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  className?: string;
  options: SelectOption[];
};

const Select: React.FC<SelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  return (
    <label className={styles.label}>
      {label && <span className={styles.labelText}>{label}</span>}
      <select className={`${styles.selectInput} ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option?.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
