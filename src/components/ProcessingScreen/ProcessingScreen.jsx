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
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Validando identidad, por favor espere...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <h4>Error en validación</h4>
        <p>{error}</p>
      </div>
    );
  }
  // Si no está cargando ni hay error, no renderiza nada
  return null;
}
