import { useState } from "react";

//guardando los valores del usuario
const useStartValidation = () => {
  const [userId, setUserId] = useState("USR-SELLER-1C701FE1"); // Estado para el ID de usuario
  const [consentGiven, setConsentGiven] = useState(false); // Estado para el consentimiento
  const [error, setError] = useState(null); // Estado para errores
  const [frontImage, setFrontImage] = useState(null); // Estado para la imagen frontal del documento
  const [backImage, setBackImage] = useState(null); // Estado para la imagen trasera del documento
  const [selfieImage, setSelfieImage] = useState(null); // Estado para la imagen selfie del usuario

  // Validación inicial: solo ID + consentimiento (para abrir CaptureFlow)
  const handleStartValidation = () => {
    if (userId !== "USR-SELLER-1C701FE1") {
      setError("El ID de usuario no es válido.");
      return false;
    }
    if (!consentGiven) {
      setError("Debe aceptar el consentimiento para continuar.");
      return false;
    }
    setError(null);
    return true;
  };

  // Validación final: ID + consentimiento + 3 imágenes (para enviar al backend)
  const handleFinalValidation = () => {
    if (!userId) {
      setError("Por favor, ingrese su ID de usuario.");
      return false;
    }
    if (!consentGiven) {
      setError("Debe aceptar el consentimiento para continuar.");
      return false;
    }
    if (!frontImage) {
      setError("Por favor, capture la imagen frontal de la cédula.");
      return false;
    }
    if (!backImage) {
      setError("Por favor, capture la imagen trasera de la cédula.");
      return false;
    }
    if (!selfieImage) {
      setError("Por favor, capture su selfie.");
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
    frontImage,
    setFrontImage,
    backImage,
    setBackImage,
    selfieImage,
    setSelfieImage,
    error,
    setError,
    handleStartValidation,
    handleFinalValidation,
  };
};

export default useStartValidation;
