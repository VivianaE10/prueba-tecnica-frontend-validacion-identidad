//mostrar el resultado final de la validación de identidad al usuario y permitirle decidir qué hacer después.

import "bootstrap/dist/css/bootstrap.min.css";

const ResultScreen = ({ result, onRetry, onGoHome }) => {
  if (!result) {
    return null;
  }
  if (result.approved) {
    return (
      <div className="text-center p-5">
        <div className="alert alert-success">
          <h2>¡Identidad validada correctamente!</h2>
          <p>
            Score: {result.score} | Nivel de riesgo: {result.risk_level}
          </p>
          <button className="btn btn-primary mt-3" onClick={onGoHome}>
            Ir al Home
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center p-5">
        <div style={{ background: "#e3f2fd", borderRadius: 12, padding: 32, boxShadow: "0 2px 8px rgba(33,150,243,0.1)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#1976d2" className="mb-3" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            <path d="M7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm.93-7.481c-.342-.034-.678.252-.678.598v4.764c0 .346.336.632.678.598.342-.034.678-.252.678-.598V4.117c0-.346-.336-.632-.678-.598z"/>
          </svg>
          <h2 style={{ color: "#1976d2" }}>No fue posible validar tu identidad</h2>
          <p style={{ color: "#1976d2" }}>Por favor, verifica tus fotos e intenta nuevamente.</p>
          <button className="btn btn-outline-primary me-2" onClick={onRetry}>
            Reintentar
          </button>
          <button className="btn btn-primary" onClick={onGoHome}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
};
export default ResultScreen;
