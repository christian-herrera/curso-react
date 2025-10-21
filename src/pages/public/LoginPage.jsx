import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

// Contextos
import { AuthContext } from "../../contexts/AuthContext";


/**
 * --------------------------------------------------------------
 * ==> Login.jsx - Página de inicio de sesión
 * --------------------------------------------------------------
 */
export default function LoginPage() {
    const navigate = useNavigate();

    // Props del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Context de Autenticación
    const { login } = useContext(AuthContext);

    // Atiende el submit del formulario del login
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password) ? navigate("/dashboard") : alert("Credenciales inválidas");
        return;
    }


    return (
        <>
            {/* Ventana Modal Informativa */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Simulación del login...</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            Utiliza cualquiera de los siguientes correos y contraseñas para iniciar sesión:
                            <table className="table table-bordered text-center w-75 mx-auto my-2">
                                <thead>
                                    <tr>
                                        <th>Rol</th>
                                        <th>Correo</th>
                                        <th>Contraseña</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fst-italic">Admin</td>
                                        <td><code className="bg-dark text-light px-2 py-1 rounded fs-6">admin@admin</code></td>
                                        <td><code className="bg-dark text-light px-2 py-1 rounded fs-6">1234</code></td>
                                    </tr>
                                    <tr>
                                        <td className="fst-italic">Invitado</td>
                                        <td><code className="bg-dark text-light px-2 py-1 rounded fs-6">guest@guest</code></td>
                                        <td><code className="bg-dark text-light px-2 py-1 rounded fs-6">1234</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner de login */}
            <motion.div
                key="banner"
                initial={{ opacity: 0, y: 30 }} // Inicia invisible y desplazado 30px hacia abajo
                animate={{ opacity: 1, y: 0 }}  // Se mueve a su posición original y se vuelve visible
                exit={{ opacity: 0, y: -30 }}   // Al salir, se vuelve invisible y se mueve 30px hacia arriba
                transition={{ duration: 0.4 }}  // Duración de la transición
            >

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

                        <div className="d-flex justify-content-center align-items-center gap-2 pb-3">
                            <div className="w-100">
                                <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate('/')}>Regresar</button>
                            </div>
                            <div className="">
                                <button type="button" className="btn btn-outline-secondary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">?</button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>

    );
}