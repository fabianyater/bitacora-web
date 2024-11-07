import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuth";
import styles from "./UserStyles.module.css";

type UserLayoutPropsType = {
  children?: ReactNode;
};

export const UserLayout = ({ children }: UserLayoutPropsType) => {
  const { auth, logout } = useAuthContext();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          🌿 BiBo
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Link to="/logbooks">Bitácoras</Link>
            </li>
            <li>
              <Link to="/locations">Ubicaciones</Link>
            </li>
          </ul>
          <div className={styles.user}>
            <div className={styles.info}>
              <span>{auth.username}</span>
              <span>{auth.role}</span>
            </div>
            <button onClick={logout}>
              <span>Salir</span>
            </button>
          </div>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <Toaster position="top-right" />
    </div>
  );
};
