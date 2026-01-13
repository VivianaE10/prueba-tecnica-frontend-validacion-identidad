import { useState } from "react";

//guardando los valores del usuario
const useStartValidation = () => {
  const [userId, setUserId] = useState(""); // Estado para el ID de usuario
  const [consentGiven, setConsentGiven] = useState(false); // Estado para el consentimiento
  const [error, setError] = useState(null); // Estado para errores

  // Lógica para iniciar el proceso de validación
  const handleStartValidation = () => {
    if (!userId) {
      setError("Por favor, ingrese su ID de usuario.");
      return false;
    }
    if (!consentGiven) {
      setError("Debe aceptar el consentimiento para continuar.");
      return false;
    }
    setError(null);
    return true;
  };

  return {
    userId,
    setUserId,
    consentGiven,
    setConsentGiven,
    error,
    setError,
    handleStartValidation,
  };
};

export default useStartValidation;
