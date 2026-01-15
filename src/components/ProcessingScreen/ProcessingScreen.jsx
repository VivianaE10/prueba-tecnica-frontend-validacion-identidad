//

import { useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import "./ProcessingScreen.css";

export default function ProcessingScreen({
  userId,
  images,
  onValidationComplete,
}) {
  // Usar el hook de validación
  const { loading, error, success, result, validateIdentity } = useValidation();

  // Renderizar la pantalla de procesamiento
  useEffect(() => {
    // Llamar con los datos capturados
    validateIdentity(userId, {
      front: images.front,
      back: images.back,
      selfie: images.selfie,
    });
  }, []); // Ejecutar solo una vez al montar el componente

  //Si se completa: ejecutar callback del padre
  useEffect(() => {
    if (success && result) {
      onValidationComplete(result);
    }
  }, [success, result, onValidationComplete]);

  //Renderizar según estado
  if (loading) {
    return (
      <div className="processing-container">
        <div className="processing-content">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="processing-message mt-3">
            Validando identidad, por favor espere...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="processing-container">
        <div className="error-container">
          <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-exclamation-triangle flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Error:"
            >
              <path d="M7.938 2.016a.13.13 0 0 1 .125 0l6.857 11.856c.06.104-.015.228-.125.228H1.205a.145.145 0 0 1-.125-.228L7.938 2.016zm.862-1.757a1.13 1.13 0 0 0-1.6 0L.104 12.115C-.418 12.97.262 14 1.205 14h13.59c.943 0 1.623-1.03 1.1-1.885L8.8.259zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <div>
              <strong>Error en validación:</strong> {error}
            </div>
            <button
              type="button"
              className="btn-close ms-auto"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    );
  }
  // Si no está cargando ni hay error, no renderiza nada
  return null;
}
