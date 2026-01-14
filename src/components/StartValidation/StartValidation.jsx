import "bootstrap/dist/css/bootstrap.min.css";
import useStartValidation from "./useStartValidation";

const StartValidation = () => {
  const {
    userId,
    setUserId,
    consentGiven,
    setConsentGiven,
    handleStartValidation,
    error,
    setError,
  } = useStartValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = handleStartValidation();
    if (isValid) {
      console.log("Validación correcta ✅ ID:", userId);
      alert(`Validación correcta ✅ ID: ${userId}`);
    }
    // Lógica para manejar el envío del formulario
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">Validación de Identidad</h2>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            ID de usuario
          </label>
          <input
            type="text"
            id="userId"
            className="form-control form-control-lg"
            placeholder="Ingrese su id"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError(null);
            }}
          />
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="consentCheck"
            checked={consentGiven}
            onChange={(e) => {
              setConsentGiven(e.target.checked);
              setError(null);
            }}
          />
          <label className="form-check-label" htmlFor="consentCheck">
            He leído y acepto el uso de mis datos e imágenes exclusivamente para
            este proceso de validación.
          </label>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="alert alert-info small mb-4" role="alert">
          <strong>Aviso de privacidas </strong>
          <p className="mb-0">
            Los datos y las imágenes utilizadas en esta prueba técnica son
            únicamente para fines de evaluación. Ninguna información es
            almacenada, persistida, compartida o utilizada con fines
            comerciales. Las imágenes capturadas se envían exclusivamente al
            servicio de validación para efectos de la prueba y no son guardadas
            por el sistema.
          </p>
        </div>
        <button className="btn btn-primary btn-lg w-100" type="submit">
          Iniciar Validación
        </button>
      </form>
    </div>
  );
};

export default StartValidation;
