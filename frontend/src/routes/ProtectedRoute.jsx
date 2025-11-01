import { Navigate } from "react-router-dom";

// Contextos
import { useAuth } from "../contexts/AuthContext";



// --------------------------------------------------------------
// ==> ProtectedRoute.jsx - Componente de Ruta Protegida
// --------------------------------------------------------------
export default function ProtectedRoute({ children }) {
    const { userIsValid } = useAuth();

    // Si no está autenticado y accede a una ruta privada, mostrar 401
    if (!userIsValid) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
