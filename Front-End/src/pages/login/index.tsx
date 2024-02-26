import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, schema } from "./validator";
import { userAuth } from "../../hooks/useAuth";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = userAuth();
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: LoginData) => {
    signIn(data);
  };

  const handleLogout = () => {
    setTimeout(() => {
      toast.success("Redirecionando para a página de Registro 💻");
      navigate("/");
    }, 1000);
  };

  return (
    <main>
      <header className={styles.header}>
        <h1 className={styles.title__login}>
          Por favor, insira suas informações de cadastro <br />
          para ser redirecionado ao painel principal!
        </h1>
      </header>

      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Senha
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <p className={styles.p_register}>
          Não está registrado? <br />
        </p>

        <p className={styles.p_register}>clique aqui 👇</p>

        <button type="button" onClick={handleLogout} className={styles.button}>
          Registro
        </button>
      </form>
    </main>
  );
};
