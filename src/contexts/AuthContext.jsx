import { createContext, useState } from "react";
export const AuthContext = createContext();



export default function AuthProvider({ children }) {
  // Leo o establezco los datos del usuario
  const [userData, setUserData] = useState(() => {
    const userStored = localStorage.getItem("userData");
    return userStored ? JSON.parse(userStored) : null;
  });

  // Función para establecer los datos del usuario
  const setDatosUsuario = (nombre, email) => {
    const user = { nombre, email };
    setUserData(user);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  // Proveo el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ userData, setDatosUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
