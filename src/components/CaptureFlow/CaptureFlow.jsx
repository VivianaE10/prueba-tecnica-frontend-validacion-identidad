import { useState } from "react";
import CameraStep from "./cameraStep";

export default function CaptureFlow({ onFinish, onCancel }) {
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

  const [index, setIndex] = useState(0);
  const [images, setImages] = useState({
    font: null,
    back: null,
    selfie: null,
  });

  const handleCaptured = (dataUrl) => {
    setImages((prev) => ({ ...prev, [steps[index].id]: dataUrl }));
    if (index < steps.length - 1) setIndex((i) => i + 1);
  };

  const handleFinish = () => {
    if (!images.front || !images.back || !images.selfie) {
      return alert("Por favor capturare las 3 imagenes requeridas");
    }
    onFinish(images);
  };

  return (
    <div className="card p-4" style={{ maxWidth: 760, margin: "0 auto" }}>
      <h4 className="mb-3">Captura de imágenes</h4>
      <div className="mb-2">
        Paso {index + 1} de {steps.length}:{" "}
        <strong>{steps[index].label}</strong>
      </div>
      <CameraStep
        label={steps[index].label}
        facingMode={steps[index].facingMode}
        onCaptured={handleCaptured}
        onCancel={onCancel}
      />
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-outline-secondary"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          Atrás
        </button>
        {index === steps.length - 1 ? (
          <button className="btn btn-success" onClick={handleFinish}>
            Enviar a validación
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setIndex((i) => i + 1)}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
