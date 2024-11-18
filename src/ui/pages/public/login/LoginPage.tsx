import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuth";
import { AuthData, authenticate } from "../../../../services/endpoints/auth";
import styles from "./styles.module.css";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth, expiredSession, setExpiredSession, loading, setAuth } =
    useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AuthData>();

  const onSubmit: SubmitHandler<AuthData> = async (data) => {
    setIsLoading(true);

    try {
      const response = await authenticate(data);

      if (response.token && response.role && response.username) {
        const updateAuth = {
          userId: response.userId,
          token: response.token,
          role: response.role,
          username: response.username,
          expirationTime: response.expirationTime,
          permissions: response.permissions
            ? Array.isArray(response.permissions)
              ? response.permissions
              : [response.permissions]
            : [],
        };

        setAuth(updateAuth);
        localStorage.setItem("auth", JSON.stringify(updateAuth));

        if (response.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/logbooks");
        }
      } else {
        toast.error("Datos inválidos");
      }
    } catch (error: unknown) {
      toast.error(`Error al iniciar sesión. Intente nuevamente. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && auth.token && auth.role) {
      if (auth.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (["researcher", "partner"].includes(auth.role)) {
        navigate("/logbooks", { replace: true });
      }
    }
  }, [auth, loading, navigate]);

  useEffect(() => {
    if (expiredSession) {
      setExpiredSession(false);
      toast.error("La sesión ha caducado");
    }
  }, [expiredSession, setExpiredSession]);

  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <span>Nombre de usuario</span>
          <input
            className={styles.input}
            type="text"
            placeholder="John Doe"
            required
            {...register("username", { required: true })}
          />
        </label>
        <label className={styles.label}>
          <span>Contraseña</span>
          <input
            className={styles.input}
            type="password"
            required
            {...register("password", { required: true })}
          />
        </label>
        <button className={styles.button} type="submit">
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
      <span>
        ¿No tienes una cuenta? ¡Registrate <Link to={"/register"}>aquí!</Link>
      </span>
      <Toaster position="top-right" />
    </div>
  );
};
