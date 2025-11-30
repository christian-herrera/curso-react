import { useEffect } from "react";

// -----------------------------------------------------------------------
// --> Component: Paginator.jsx - Arma los botones para mover las páginas
// -----------------------------------------------------------------------
export default function Paginator({ currentPage, totalPages, onPageChange }) {
    const delta = 2; // Cantidad de páginas a mostrar antes y después de la actual
    let start = currentPage - delta;
    let end = currentPage + delta;

    // Ajusta los límites si es necesario
    if (totalPages <= 4) {
        start = 1;
        end = totalPages;
    } else {
        // Asegura el extremo inferior
        if (start < 1) {
            end += 1 - start;
            start = 1;
        }

        // Asegura el extremo superior
        if (end > totalPages) {
            start -= end - totalPages;
            end = totalPages;
        }
    }

    // Agrego los números de página al array
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    // --> Utilidad: Handler para el botón de página anterior
    const onPrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // --> Utilidad: Handler para el botón de página siguiente
    const onNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // --> Utilidad: Atiende las flechas para cambiar de página
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentPage, totalPages]);

    // --> RENDERIZADO
    return (
        <nav aria-label="Páginación de items">
            <ul className="pagination justify-content-center">
                {/* Botón -> Anterior */}
                <li className="page-item">
                    <button className={`page-link ${currentPage === 1 ? "disabled" : ""}`} tabIndex="-1" style={{ cursor: "pointer" }} onClick={onPrev}>
                        Anterior
                    </button>
                </li>

                {/* Numeros de páginas */}
                {pages.map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(page)} style={{ cursor: "pointer" }}>
                            {page}
                        </button>
                    </li>
                ))}

                {/* Botón -> Siguiente */}
                <li className="page-item">
                    <button className="page-link" style={{ cursor: "pointer" }} onClick={onNext}>
                        Siguiente
                    </button>
                </li>
            </ul>
        </nav>
    );
}
