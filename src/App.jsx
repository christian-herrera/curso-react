import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

// Componentes y Contextos
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Errores
import Error404 from "./pages/Error404";



function App() {
  /*
    TODO: Se utiliza HashRouter en lugar de BrowserRouter para evitar problemas en GitHub Pages.  
    En un entorno de producción con un servidor adecuado, se debería usar BrowserRouter.
  */


  return (
    <AuthProvider>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Rutas Privadas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Páginas de Error */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      {/* </BrowserRouter> */}
      </HashRouter>
    </AuthProvider>
  );
}

export default App;