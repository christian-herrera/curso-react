import { createContext, useContext, useState } from "react";
import { sendLoginData } from "../services/apiAuth.js";

// Creo el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto. Se utiliza como: 
// import { useAuth } from '...../AuthContext';
// const { isAuth, user, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);


/**
 * --------------------------------------------------------------
 * ==> AuthContext.jsx - Proveedor del contexto de autenticación
 * --------------------------------------------------------------
 */
export default function AuthProvider({ children }) {

  // Leo o establezco los datos del usuario leyendo
  // de sessionStorage
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });




  const login = async (email, clave) => {

    // ==> Hago la petición al backend usando el servicio
    try {
      const resp = await sendLoginData(email, clave);

      if (resp.result) {
        const userData = {
          email: email,
          token: resp.token,
          rol: resp.data.rol,
          nombre: resp.data.nombre,
          apellido: resp.data.apellido
        };
        setUser(userData);                                        // Actualizo la prop
        sessionStorage.setItem("user", JSON.stringify(userData)); // Guardo en sessionStorage

        return true;
      }
    } catch (error) {
      console.error("Error en login: ", error);
    }

    return false;
  };


  // ==> Logout - Cierra la sesión del usuario
  const logout = () => {
    setUser(null); // Limpia la prop
    sessionStorage.removeItem("user"); // Limpia el sessionStorage
  };


  // ==> Proveo el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ userNombre: user?.nombre, userApellido: user?.apellido, userToken: user?.token, userIsValid: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
