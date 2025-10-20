export default function Error404() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light" >
            <h1 className="fw-bold text-danger" style={{ fontSize: "5rem" }}>404</h1>
            <p className="lead text-muted">Página no encontrada</p>
        </div>
    )
}