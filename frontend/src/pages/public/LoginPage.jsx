import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Contextos
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

// Utils
import { showError, showTimedAlert, showHelpLoginMessage } from "../../utils/utilsAlert";

// --------------------------------------------------------------
// --> Page: LoginPage.jsx - Página de Login
// --------------------------------------------------------------
export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const { cartClear } = useCart();

    // --> Hook: Redirige si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) navigate("/products");
    }, []);

    // --> Handle: Submit del Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(e.target.username.value, e.target.password.value);
        if (result.success) {
            cartClear();

            const resp = await showTimedAlert("Autenticación exitosa!", result.message, 3000, "success");
            if (resp.isConfirmed || resp.isDismissed) {
                cartClear();
                navigate("/products");
            }
        } else {
            showError("Correo o contraseña incorrectos");
        }
    };

    // --> RENDERIZADO
    return (
        <>
            {/* Banner de login */}
            <motion.div
                key="banner"
                initial={{ opacity: 0, y: 30 }} // Inicia invisible y desplazado 30px hacia abajo
                animate={{ opacity: 1, y: 0 }} // Se mueve a su posición original y se vuelve visible
                exit={{ opacity: 0, y: -30 }} // Al salir, se vuelve invisible y se mueve 30px hacia arriba
                transition={{ duration: 0.4 }} // Duración de la transición
            >
                <div className="container-login">
                    <form className="container mt-3 pt-3" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" autoComplete="username" required />
                            <label htmlFor="username">Correo electrónico</label>
                        </div>

                        {/* Contraseña */}
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" autoComplete="current-password" required />
                            <label htmlFor="password">Contraseña</label>
                        </div>

                        {/* Botones de acción */}
                        <button type="submit" className="btn btn-outline-primary w-100 mb-3">
                            Ingresar
                        </button>

                        <div className="d-flex justify-content-center align-items-center gap-2 pb-3">
                            <div className="w-100">
                                <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate("/")}>
                                    Regresar
                                </button>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-outline-secondary w-100 px-3" onClick={showHelpLoginMessage}>
                                    ?
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
}
