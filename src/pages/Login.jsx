import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";    // npm install framer-motion
import { useNavigate } from "react-router-dom";             // npm install react-router-dom

// Context de Autenticación
import { AuthContext } from "../contexts/AuthContext";

// Imagenes
import logo from "../assets/logo.svg";

/**
 * --> Formulario de Login
 * Muestra un formulario de login con campos para email y contraseña.
 * Al enviar el formulario, muestra una alerta con los datos ingresados.
 */
function Login({ onClick }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Context de Autenticación
    const { setDatosUsuario } = useContext(AuthContext);

    // Atiende el submit del formulario del login
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulación de autenticación: admin@admin / 1234
        if (email.trim() === "admin@admin" && password.trim() === "1234") {
            setDatosUsuario("Administrador", email);
            navigate("/dashboard");
            return;
        } else {
            alert("Credenciales inválidas");
        }
    }

    // Render del formulario
    return (
        <div style={{ width: "600px", maxWidth: "400px", backgroundColor: "white", borderRadius: "8px" }}>
            <form className="container mt-3 pt-3" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-floating mb-3">
                    <input type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Correo electrónico</label>
                </div>

                {/* Contraseña */}
                <div className="form-floating mb-3">
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Contraseña</label>
                </div>

                {/* Botones de acción */}
                <button type="submit" className="btn btn-outline-primary w-100 mb-3">Ingresar</button>
                <button type="button" className="btn btn-outline-secondary w-100 mb-3" onClick={onClick}>Regresar</button>
            </form>
        </div>
    )
}


/**
 * --> Banner de Bienvenida
 * Muestra un banner de bienvenida con un botón para ingresar al formulario de login.
 */
function Banner({ onClick }) {
    return (
        <div style={{ width: "600px", maxWidth: "400px", borderRadius: "8px" }}>
            {/* Titulo */}
            <h1 className="fw-bold text-white" style={{ fontSize: "2.5rem" }}>Bienvenido...</h1>

            {/* Subtitulo */}
            <p className="lead text-white mb-5">
                Descubrí los mejores productos de electrónica con la mejor calidad. Tu experiencia de
                compra comienza aquí.
            </p>

            {/* Boton para mostrar el formulario de login */}
            <button className="btn btn-outline-primary btn-lg px-5" onClick={onClick}>
                Ingresar
            </button>
        </div>
    )
}



/**
 * --> Página de Inicio
 * Muestra un banner de bienvenida y un formulario de login con animaciones.
 */
export default function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="bg-home d-flex flex-column justify-content-center align-items-center text-center vh-100 pt-5" >
            {/* Logo */}
            <img
                src={logo}
                alt="Logo"
                className="mb-4"
                style={{ width: "100%", maxWidth: "300px", cursor: "pointer" }}
            />


            <AnimatePresence mode="wait">
                <div className="h-100">
                    {showLogin ? (
                        // Formulario de Login
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 30 }} // Inicia invisible y desplazado 30px hacia abajo
                            animate={{ opacity: 1, y: 0 }}  // Se mueve a su posición original y se vuelve visible
                            exit={{ opacity: 0, y: -30 }}   // Al salir, se vuelve invisible y se mueve 30px hacia arriba
                            transition={{ duration: 0.4, ease: "easeInOut" }}  // Duración de la transición
                        >
                            <Login onClick={() => setShowLogin(false)} />
                        </motion.div>
                    ) : (
                        // Banner de Bienvenida
                        <motion.div
                            key="banner"
                            initial={{ opacity: 0, y: 30 }} // Inicia invisible y desplazado 30px hacia abajo
                            animate={{ opacity: 1, y: 0 }}  // Se mueve a su posición original y se vuelve visible
                            exit={{ opacity: 0, y: -30 }}   // Al salir, se vuelve invisible y se mueve 30px hacia arriba
                            transition={{ duration: 0.4 }}  // Duración de la transición
                        >
                            <Banner onClick={() => setShowLogin(true)} />
                        </motion.div>
                    )}
                </div>
            </AnimatePresence>
        </div>
    );
}