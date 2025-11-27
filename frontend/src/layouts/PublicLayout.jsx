import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

// -------------------------------------------------------------
// --> Layout: PublicLayout.jsx - Diseño del Layout Público
// -------------------------------------------------------------
export default function PublicLayout() {
    // --> Utilidad: Carga inicial
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState(null);
    const [bg, setBg] = useState(null);
    useEffect(() => {
        Promise.all([
            import("../assets/bg1.jpg"),
            import("../assets/logo.svg"),
            new Promise((res) => setTimeout(res, 500)), // Simula un retardo mínimo
        ]).then(([importBg, importLogo]) => {
            setLogo(importLogo.default);
            setBg(importBg.default);
            setLoading(false);
        });
    }, []);

    // --> RENDERIZADO
    return (
        <>
            <AnimatePresence>
                {loading ? (
                    <motion.div className="loader-page" key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}>
                        <ClipLoader color="#00c0faff" size={80} />
                    </motion.div>
                ) : (
                    <div
                        className="bg-home"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bg})`,
                        }}
                    >
                        {/* Logo */}
                        <img src={logo} alt="Logo" />

                        <div className="h-100">
                            <Outlet />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
