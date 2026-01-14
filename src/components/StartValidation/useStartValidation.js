import { useState } from "react";

//guardando los valores del usuario
const useStartValidation = () => {
  const [userId, setUserId] = useState(""); // Estado para el ID de usuario
  const [consentGiven, setConsentGiven] = useState(false); // Estado para el consentimiento
  const [error, setError] = useState(null); // Estado para errores
  const [frontImage, setFrontImage] = useState(null); // Estado para la imagen frontal del documento
  const [backImage, setBackImage] = useState(null); // Estado para la imagen trasera del documento
  const [selfieImage, setSelfieImage] = useState(null); // Estado para la imagen selfie del usuario

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
    if (!frontImage) {
      setError("Por favor, suba la imagen frontal del documento.");
      return false;
    }
    if (!backImage) {
      setError("Por favor, suba la imagen trasera del documento.");
      return false;
    }
    if (!selfieImage) {
      setError("Por favor, suba su selfie.");
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
  };
};

export default useStartValidation;
