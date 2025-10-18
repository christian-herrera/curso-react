import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Páginas de errores
import Error401 from "../pages/Error401";

export default function PrivateRoute({ children }) {
    const { userData } = useContext(AuthContext);

    if (!userData) {
        return <Error401 />;
    }

    return children;
};

