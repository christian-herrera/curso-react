import { Outlet } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

// Imagenes
import logo from "../assets/logo.svg";


/**
 * --------------------------------------------------------------
 * ==> PublicLayout.jsx - Diseño del Layout Público
 * --------------------------------------------------------------
 */
export default function PublicLayout() {
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
                    <Outlet />
                </div>
            </AnimatePresence>
        </div>
        
    );
}
        