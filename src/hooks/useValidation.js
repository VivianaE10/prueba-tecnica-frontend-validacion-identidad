//este hook me consume el endpoint de validacion

import { useCallback, useState } from "react";

const useValidation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);

  //Función para enviar imágenes al endpoint
  const validateIdentity = useCallback(async (userId, images) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      //crear el form data para enviar las imagenes
      const formData = new FormData();
      formData.append("user_id", userId);

      // Convertir base64 a Blob (archivo)
      // images.front, images.back, images.selfie son dataURLs (base64)
      formData.append("user_id", userId);
      formData.append("frente", dataURLtoBlob(images.front), "frente.jpg");
      formData.append("reverso", dataURLtoBlob(images.back), "reverso.jpg");
      formData.append("selfie", dataURLtoBlob(images.selfie), "selfie.jpg");

      const ENDPOINT_URL = "https://mubis.app/api/cedula/validate-complete";

      //realizar fetch al endpoint
      const response = await fetch(ENDPOINT_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data.result); //guardar el resultado completo
      setSuccess(true);
      return data.result; // devolver el resultado
    } catch (error) {
      setError(error.message || "Error de validación");
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, result, validateIdentity };
};

// Función auxiliar: convertir dataURL (base64) a Blob (archivo)
function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1]; // Extraer tipo MIME
  const bstr = atob(arr[1]); // Decodificar base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime }); // Crear Blob
}

export default useValidation;
