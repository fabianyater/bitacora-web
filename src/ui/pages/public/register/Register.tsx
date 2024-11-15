import { Roles, User } from "@/utils/types/userTypes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../../services/endpoints/users";
import styles from "./styles.module.css";

interface NewUser extends User {
  role: Roles;
}

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<NewUser>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    setIsLoading(true);
    const response = await registerUser(data, data.role);

    try {
      if (response.ok) {
        navigate("/");
      }
    } catch (error: unknown) {
      console.log("Something went wrong: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 1,
      value: "researcher",
      name: "Investigador",
    },
    {
      id: 2,
      value: "partner",
      name: "Colaborador",
    },
  ];

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.input_group}>
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
            <span>Correo electrónico</span>
            <input
              className={styles.input}
              type="email"
              placeholder="jhon.doe@email.com"
              required
              {...register("email", { required: true })}
            />
          </label>
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>
            <span>Contraseña</span>
            <input
              className={styles.input}
              type="password"
              required
              {...register("password", { required: true })}
            />
          </label>
          <label className={styles.label}>
            <span>Roles</span>
            <select
              required
              {...register("role", { required: true })}
              className={styles.select}
            >
              <option value="">Seleccionar rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.value}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className={styles.button} type="submit">
          {isLoading ? "Loading..." : "Crear cuenta"}
        </button>
      </form>
      <span>
        Ya tienes una cuenta? ¡Inicia sesión <Link to={"/"}>aquí!</Link>
      </span>
    </div>
  );
};
