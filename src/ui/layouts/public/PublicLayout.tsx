import { ReactNode } from "react";
import styles from "./styles.module.css";

type PublicLayoutPropsType = {
  children?: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutPropsType) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🌿 Bitácora Botánica</h1>
        <p className={styles.description}>
          Observa, registra y gestiona cada hallazgo de campo con precisión y
          profesionalismo.
        </p>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Universidad - Equipo de Investigación en
          Botánica
        </p>
      </footer>
    </div>
  );
};
