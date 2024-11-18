import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../../../hooks/useAuth";
import { getProfile } from "../../../../services/endpoints/users";
import { IUserResponse } from "../../../../utils/types/userTypes";
import styles from "./styles.module.css";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserResponse>();
  const { auth, logout } = useAuthContext();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setIsLoading(true);
        if (auth.token && auth.userId) {
          const response = await getProfile(auth.token, auth.userId);
          setUser(response);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error al obtener el perfil");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [auth.token, auth.userId]);

  return (
    <div className={styles.profileContainer}>
      <Toaster position="top-right" />
      {isLoading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Cargando perfil...</p>
        </div>
      ) : (
        user && (
          <div className={styles.card}>
            <header className={styles.header}>
              <div className={styles.avatar}>
                <span>{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <h1 className={styles.username}>{user.username}</h1>
            </header>
            <ul className={styles.details}>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>Rol:</strong> {user.role}
              </li>
            </ul>
            <div className={styles.actions}>
              <button className={styles.logoutButton} onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProfilePage;
