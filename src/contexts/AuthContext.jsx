import { createContext, useState } from "react";

// Creo el contexto de autenticación
export const AuthContext = createContext();


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



  // Simulación de login (acá debería ir un fetch al backend)
  const login = (email, password) => {
    if ((email === "admin@admin" && password === "1234") || (email === "guest@guest" && password === "1234")) {
      const userData = { email, role: email === "admin@admin" ? "Administrador" : "Invitado" };  // {email: "admin@admin", role: "admin"}
      setUser(userData); // Lo guarda en la prop
      sessionStorage.setItem("user", JSON.stringify(userData)); // Lo guarda en el sessionStorage
      return true;
    }

    return false;
  };


  // Simulación de logout
  const logout = () => {
    setUser(null); // Limpia la prop
    sessionStorage.removeItem("user"); // Limpia el sessionStorage
  };

  // Proveo el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuth: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
