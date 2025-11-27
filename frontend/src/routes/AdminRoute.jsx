import { Navigate } from "react-router-dom";

// Contextos
import { useAuth } from "../contexts/AuthContext";


// --------------------------------------------------------------------------
// --> AdminRoute.jsx - Protege rutas que solo pueden acceder administradores
// --------------------------------------------------------------------------
export default function AdminRoute({ children }) {
    const { is_admin } = useAuth();

    if (!is_admin) {
        return <Navigate to="/401" />;  // o página 403
    }

    return children;
}