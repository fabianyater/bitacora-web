import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.css";

export type InputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    className?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
  };

const Input = <T extends FieldValues>({
  label,
  name,
  className,
  register,
  ...props
}: InputProps<T>) => {
  return (
    <label className={styles.label}>
      {label && <span className={styles.labelText}>{label}</span>}
      <input
        className={`${styles.input} ${className}`}
        {...props}
        {...register(name)}
      />
    </label>
  );
};

export default Input;
