import { ReactNode, createContext } from "react";
import { RegisterData } from "../pages/register/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface RegisterProviderProps {
    children: ReactNode
}

interface RegisterContextValues {
    signUp: (data: RegisterData) => void;
}

export const RegisterContext = createContext<RegisterContextValues>({} as RegisterContextValues);

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
    const navigate = useNavigate();

    const signUp = async (data: RegisterData) => {
        
        try {
            const response = await api.post("/users", data);
            const { token } = response.data;
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
            navigate("login");
            toast.success('Cadastro bem-sucedido, Redirecionando para a página de login 🚀');
        } catch (error) {
            toast.error('Erro ao fazer Cadastro. Verifique se os dados dos campos estão corretos!');
            console.log(error);
        }
    };

    return (
        <RegisterContext.Provider value={{ signUp }}>
            {children}
        </RegisterContext.Provider>
    );
};