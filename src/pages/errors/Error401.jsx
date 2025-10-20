import { useEffect, useState } from "react"

export default function Error401() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if(countdown > 0){
            const timer = setInterval(() => setCountdown(countdown - 1), 1000);
            return () => clearInterval(timer);
        } else {
            window.location.href = "/";
        }
    }, [countdown]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light" >
            <h1 className="fw-bold text-danger" style={{ fontSize: "5rem" }}>401</h1>
            <p className="lead text-muted">No estás autorizado para ver esta página</p>
            <p className="lead text-muted">Serás redirigido al inicio en {countdown} segundos...</p>
        </div>
    )
}