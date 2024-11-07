import { ReactNode, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuth";
import styles from "./UserStyles.module.css";

type UserLayoutPropsType = {
  children?: ReactNode;
};

export const UserLayout = ({ children }: UserLayoutPropsType) => {
  const { auth, logout } = useAuthContext();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const mapRole = (role: string | undefined) => {
    return role === "researcher" ? "Investigador" : "Compañero";
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className={styles.user} ref={userMenuRef}>
            <button className={styles.avatar} onClick={toggleUserMenu}>
              <span>{auth.username?.charAt(0).toUpperCase()}</span>
            </button>
            {isUserMenuOpen && (
              <div className={styles.userMenu}>
                <span className={styles.userInfo}>{auth.username}</span>
                <span className={styles.userRole}>{mapRole(auth.role)}</span>
                <button onClick={closeUserMenu}>Perfil</button>
                <button
                  onClick={() => {
                    closeUserMenu();
                    logout();
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>
      <Toaster position="top-right" />
    </div>
  );
};
