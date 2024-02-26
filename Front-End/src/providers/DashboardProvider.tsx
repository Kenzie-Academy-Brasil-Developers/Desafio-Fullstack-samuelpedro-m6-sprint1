import { ReactNode, createContext } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DashboardData } from "../pages/dashboard/validator";

interface DashboardProviderProps {
    children: ReactNode
}

interface DashboardContextValues {
    mainPage: (data: DashboardData) => void;
}

export const DashboardContext = createContext<DashboardContextValues>({} as DashboardContextValues);

export const MainPageProvider = ({ children }: DashboardProviderProps) => {

    const mainPage = async (data: DashboardData) => {
        
        try {
            const storedToken = localStorage.getItem("your-login:token");

            // Se o token estiver presente no localStorage, configura o cabeçalho da API
            if (storedToken) {
                api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
            }
            
            const response = await api.post("/contacts", data);
            response.data.storedToken;
            toast.success('Contato Vinculado com sucesso! 🚀');
        } catch (error) {
            toast.error('Erro ao vincular contato. Verifique se os dados dos campos estão corretos!');
            console.log(error);
        }
    };

    return (
        <DashboardContext.Provider value={{ mainPage }}>
            {children}
        </DashboardContext.Provider>
    );
};