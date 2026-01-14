//hook que administra la cámara y captura frames.

import { useEffect, useRef, useState, useCallback } from "react";

export default function useCamera() {
  // Aquí iría la lógica para manejar la cámara y capturar frames

  const videoRef = useRef(null); //referencia al <video> del DOM donde se conecta el stream.
  const streamRef = useRef(null); // eferencia al MediaStream activo para poder detenerlo.
  const [error, setError] = useState(null); // mensaje de error si la cámara falla o se niegan permisos.
  const [ready, setReady] = useState(false); //indica que el stream está listo para capturar.

  //Enciende la cámara.
  const start = useCallback(async (constraints = { video: true }) => {
    try {
      setError(null);
      setReady(false);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Esperar un poco y luego marcar como ready
        setTimeout(() => {
          setReady(true);
        }, 500);
      }
    } catch (error) {
      setError(error.message || "Error al acceder a la cámara");
      setReady(false);
    }
  }, []);

  //Apaga la cámara.
  const stop = useCallback(() => {
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (err) {
        console.error("Error al detener stream:", err);
      }
    }
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setReady(false);
  }, []);

  //Captura una imagen  y lo devuelve como DataURL.
  const capture = useCallback(() => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.9);
  }, []);

  //Limpia el stream al desmontar el hook.
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach((track) => track.stop());
        } catch (err) {
          console.error("Error al detener stream en cleanup:", err);
        }
      }
    };
  }, []);

  return { videoRef, start, stop, capture, ready, error };
}
