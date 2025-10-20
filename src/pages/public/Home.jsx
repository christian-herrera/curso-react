import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


/**
 * --------------------------------------------------------------
 * ==> Home.jsx - Página de inicio pública
 * --------------------------------------------------------------
 */
export default function Home() {
    const navigate = useNavigate();

    return (
        <motion.div
            key="banner"
            initial={{ opacity: 0, y: 30 }} // Inicia invisible y desplazado 30px hacia abajo
            animate={{ opacity: 1, y: 0 }}  // Se mueve a su posición original y se vuelve visible
            exit={{ opacity: 0, y: -30 }}   // Al salir, se vuelve invisible y se mueve 30px hacia arriba
            transition={{ duration: 0.4 }}  // Duración de la transición
        >

            <div style={{ width: "600px", maxWidth: "400px", borderRadius: "8px" }}>
                {/* Titulo */}
                <h1 className="fw-bold text-white" style={{ fontSize: "2.5rem" }}>Bienvenido...</h1>

                {/* Subtitulo */}
                <p className="lead text-white mb-5">
                    Descubrí los mejores productos de electrónica con la mejor calidad. Tu experiencia de
                    compra comienza aquí.
                </p>

                {/* Boton para mostrar el formulario de login */}
                <button className="btn btn-outline-primary btn-lg px-5" onClick={() => navigate('/login')}>
                    Ingresar
                </button>
            </div>

        </motion.div>
    );
}