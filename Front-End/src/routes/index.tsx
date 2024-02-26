import { Route, Routes, Navigate  } from "react-router-dom"
import { Login } from "../pages/login"
import { Dashboard } from "../pages/dashboard"
import { Register } from "../pages/register"
import { isAuthenticated } from '../auth';

interface ProtectedRouteProps {
    element: React.ReactNode;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    return isAuthenticated() ? (
      <>{element}</>
    ) : (
      <Navigate to="/login" replace state={{ from: window.location.pathname }} />
    );
  };

export const RoutesMain: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
    )
}