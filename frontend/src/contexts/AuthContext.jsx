import { createContext, useContext, useEffect, useState } from "react";

// Constantes
import { ApiCodes } from "../constants/ApiCodes";

// Servicios
import { loginService } from "../services/apiAuth";

// Utils
import { showError } from "../utils/utilsAlert";

// Creo el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto. Se utiliza como:
// import { useAuth } from '...../AuthContext';
// const { isAuth, user, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);



// -------------------------------------------------------
// --> Provider: AuthProvider
// Provee el contexto de autenticación.
// -------------------------------------------------------
export default function AuthProvider({ children }) {
    // Leo o establezco los datos del usuario leyendo de sessionStorage
    const [userData, setUserData] = useState(() => {
        const saved = sessionStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    // Cada vez que userData cambia, lo guardo en sessionStorage
    useEffect(() => {
        if (userData) sessionStorage.setItem("user", JSON.stringify(userData));
        else sessionStorage.removeItem("user");
    }, [userData]);

    /**
     * ### AuthContext - Autenticación
     * Realiza el proceso de autenticación del usuario llamando al
     * servicio de login y manejando la respuesta.
     *
     * @param {string} username - Nombre de usuario o correo electrónico
     * @param {string} password - Contraseña del usuario
     * @returns {Object} - Resultado con la estructura:
     * - `success`: booleano que indica si el login fue exitoso
     * - `message`: mensaje descriptivo del resultado
     */
    async function login(username, password) {
        try {
            if (!username || !password) {
                return { success: false, message: "Faltan credenciales" };
            }

            const response = await loginService(username, password);
            if (response.code === ApiCodes.AUTH_PASS) {
                setUserData({ // Establezco la prop userData
                    id: response.data.id,
                    nombre: response.data.name,
                    apellido: response.data.surname,
                    is_admin: response.data.is_admin,
                    token: 1234567890 // Simulación de token para el funcionamiento sin backend
                });
                return { success: true, message: `Bienvenido nuevamente ${response.data.name}...` };
            } else {
                return { success: false, message: "Correo o contraseña incorrectos!" };
            }
        } catch (error) {
            return { success: false, message: "Error de conexión" };
        }
    }


    /**
     * ### AuthContext - Cerrar sesión
     * Limpia los datos del usuario y elimina la sesión.
     * 
     * @param {void}
     * @returns {void}
     */
    const logout = () => {
        setUserData(null); // Limpia la prop
        sessionStorage.removeItem("user"); // Limpia el sessionStorage
    };

    /**
     * ### AuthContext - Manejo de expiración de token
     * Si el token ha expirado, esta funcion muestra la alerta y realiza el logout.
     * 
     * @param {void}
     * @returns {void}
     */
    async function onTokenExpired() {
        const resp = await showError("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
        if (resp.isConfirmed || resp.isDismissed) {
            logout();
        }
    }

    // --> Render del proveedor del contexto
    return (
        <AuthContext.Provider
            value={{
                nombre: userData?.nombre || null,
                apellido: userData?.apellido || null,
                is_admin: userData?.is_admin || false,
                token: userData?.token || null,
                isAuthenticated: !!userData,
                login,
                logout,
                onTokenExpired,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
