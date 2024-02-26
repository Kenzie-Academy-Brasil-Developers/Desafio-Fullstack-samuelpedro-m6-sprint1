import { ReactNode, createContext } from "react";
import { LoginData } from "../pages/login/validator";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextValues {
    signIn: (data: LoginData) => void
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate()

    const signIn = async (data: LoginData) => {

        try {
            const response = await api.post("/login", data)
            const { token } = response.data
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            localStorage.setItem("your-login:token", token)
            navigate("dashboard")
            toast.success('Login bem-sucedido, Redirecionando para dashboard 🚀');
        } catch (error) {
            toast.error('Erro ao fazer login. Verifique suas credenciais.');
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn }}>
            {children}
        </AuthContext.Provider>
    )
}