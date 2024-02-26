import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RegisterData, schema } from "./validator"
import { userAuthRegister } from "../../hooks/useRegister"
import styles from "./register.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
    const navigate = useNavigate();
    const { signUp } = userAuthRegister()
    const { register, handleSubmit } = useForm<RegisterData>({
        resolver: zodResolver(schema)
    })

    const submit = (data: RegisterData) => {
        signUp(data)
    }

    const handleLogout = () => {
        setTimeout(() => {
        toast.success("Redirecionando para a página de login 💻");
        navigate('/login');
      }, 1000);
      };

    return (
        <main>
            <header className={styles.header}>
                <h1 className={styles.title__register}>
                Bem-vindo à NetworkSync 🌐
                </h1>
                <h2 className={styles.Subtitle__register}>Vincule Seus Contatos de Forma Simples 🚀</h2>
            </header>

            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <label htmlFor="fullName" className={styles.label}>Nome completo</label>
                <input type="fullName" id="fullName" {...register("fullName")} className={styles.input}/>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" {...register("email")} className={styles.input}/>

                <label htmlFor="password" className={styles.label}>Senha</label>
                <input type="password" id="password" {...register("password")} className={styles.input}/>

                <label htmlFor="telephone" className={styles.label}>Telefone</label>
                <input type="telephone" id="telephone" {...register("telephone")} className={styles.input}/>

                <button type="submit" className={styles.button}>Registar</button>

                <p className={styles.p_login}>Já está cadastrado? se sim basta <br />
                apenas clicar aqui 👇</p>

                <button type="button" onClick={handleLogout} className={styles.button}>Login</button>
            </form>
        </main>
    )
}