import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
    const response = await authenticate(data);

    try {
      if (response.token) {
        setAuth({ token: response.token });
        localStorage.setItem(
          "token",
          JSON.stringify({ ...auth, token: response.token })
        );

        navigate("/dashboard");
      }
    } catch (error: unknown) {
      console.log("Something went wrong: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      navigate("/dashboard");
    }
  }, [auth.token, navigate]);

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
          {isLoading ? "Loading..." : "Iniciar sesión"}
        </button>
      </form>
      <span>
        ¿No tienes una cuenta? ¡Registrate <Link to={"/register"}>aquí!</Link>
      </span>
    </div>
  );
};
