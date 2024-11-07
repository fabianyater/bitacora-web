import React from "react";
import styles from "./styles.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <label className={styles.label}>
      {label && <span className={styles.labelText}>{label}</span>}
      <input className={`${styles.input} ${className}`} {...props} />
    </label>
  );
};

export default Input;
