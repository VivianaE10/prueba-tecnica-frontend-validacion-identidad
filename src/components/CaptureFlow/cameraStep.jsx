//Este componente usa el hook useCamera y arma toda la interfaz para tomar una foto, aceptarla o repetirla
import { useEffect, useState } from "react";
import useCamera from "../../hooks/useCamera";

export default function CameraStep({
  label,
  facingMode,
  onCaptured,
  onCancel,
}) {
  const { videoRef, start, stop, capture, ready, error } = useCamera();
  const [preview, setPreview] = useState(null);

  //encender y apagar camara
  useEffect(() => {
    start({ video: { facingMode } });
    return () => {
      stop();
    };
  }, [facingMode, start, stop]);

  //funcuon para tomar la foto
  const handleTake = () => {
    const dataUrl = capture();
    if (dataUrl) {
      setPreview(dataUrl);
      // NO llamar a onCaptured aquí, solo guardar la preview
    }
  };

  const handleAccept = () => {
    setPreview(null); // Limpia preview primero
    stop(); // Detén la cámara
    onCaptured(preview); // Luego notifica al padre
  };

  const cameraAvailable =
    typeof navigator !== "undefined" &&
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function";

  return (
    <div>
      <h5>{label}</h5>
      {!cameraAvailable ? (
        <div className="alert alert-danger mt-3">
          🚫 Tu navegador no soporta acceso a la cámara o no está disponible.
        </div>
      ) : !preview ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", borderRadius: 8, background: "#000" }}
          />
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <div className="mt-2">
            <button
              className="btn btn-primary me-2"
              onClick={handleTake}
              disabled={!ready}
            >
              Tomar foto
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={preview}
            alt={`${label} preview`}
            className="img-fluid mb-2"
          />
          <div>
            <button
              className="btn btn-secondary me-2"
              onClick={() => {
                setPreview(null);
                start({ video: { facingMode } });
              }}
            >
              Volver a tomar
            </button>
            <button className="btn btn-primary" onClick={handleAccept}>
              Aceptar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

//useState → guarda la foto tomada
//useEffect → enciende y apaga la cámara
//useCamera → hook que maneja toda la lógica de la cámara
