import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuth";
import { AuthData, authenticate } from "../../../../services/endpoints/auth";
import styles from "./styles.module.css";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AuthData>();

  const onSubmit: SubmitHandler<AuthData> = async (data) => {
    setIsLoading(true);

    try {
      const response = await authenticate(data);

      if (response.token && response.role && response.username) {
        const updateAuth = {
          token: response.token,
          role: response.role,
          username: response.username,
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
      console.log("Something went wrong: ", error);
      toast.error("Error al iniciar sesión. Intente nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      if (auth.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/logbooks");
      }
    }
  }, [auth.role, auth.token, navigate]);

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
