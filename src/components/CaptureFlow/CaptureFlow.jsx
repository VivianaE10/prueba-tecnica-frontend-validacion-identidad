//CaptureFlow controla el orden, estado y validación de todo el proceso de captura de imágenes.

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CameraStep from "./cameraStep";

export default function CaptureFlow({ onCancel, onSubmit }) {
  //Definición los 3  pasos
  const steps = [
    {
      id: "front",
      label: "cedula- frente",
      facingMode: "environment",
    },
    { id: "back", label: "cedula- reverso", facingMode: "environment" },
    { id: "selfie", label: "selfie", facingMode: "user" },
  ];

  //Estado del paso actual y  estado de imagenes capturadas
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState({
    front: null,
    back: null,
    selfie: null,
  });

  //Funcion para manejar la imagen capturada
  const handleCaptured = (dataUrl) => {
    const updatedImages = { ...images, [steps[index].id]: dataUrl };
    setImages(updatedImages);
    // Avanzar al siguiente paso solo si no es el último
    if (index < steps.length - 1) {
      setIndex((i) => i + 1);
    }
    // Si es la última foto, no avances (quedarás en el paso 2, pero con la foto guardada)
  };

  // Verificar si todas las fotos están completas
  const allPhotosComplete = images.front && images.back && images.selfie;

  const currentStep = steps[index] || steps[steps.length - 1];
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: 500, width: "100%" }}
      >
        <h4 className="mb-3 text-center">Captura de imágenes</h4>

        {allPhotosComplete ? ( //muestro el resumen si ya estan todas las fotos
          <div>
            <div className="alert alert-success mb-3">
              ✅ Las 3 imágenes han sido capturadas correctamente.
            </div>
            <div className="mb-3">
              <p>
                <strong>Resumen:</strong>
              </p>
              <ul className="list-unstyled">
                <li>✓ Cédula - Frente</li>
                <li>✓ Cédula - Reverso</li>
                <li>✓ Selfie</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3">
              Paso {index + 1} de {steps.length}:{" "}
              <strong>{currentStep.label}</strong>
            </div>
            <CameraStep
              key={index}
              label={currentStep.label}
              facingMode={currentStep.facingMode}
              onCaptured={handleCaptured}
              onCancel={onCancel}
            />
          </>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary"
            disabled={allPhotosComplete || index === 0}
            onClick={() => setIndex((i) => i - 1)}
          >
            Atrás
          </button>
          {allPhotosComplete && (
            <button
              className="btn btn-success"
              onClick={() => onSubmit(images)}
            >
              Enviar a validación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
