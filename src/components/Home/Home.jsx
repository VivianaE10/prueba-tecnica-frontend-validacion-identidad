import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const Home = ({ result }) => (
  <div
    className="container d-flex flex-column min-vh-100"
    style={{ background: "#e3f2fd" }}
  >
    <div className="row">
      <div className="col-12 text-center mt-4 mb-2">
        <h4 style={{ color: "#1976d2", fontWeight: 900, letterSpacing: 5 }}>
          Home
        </h4>
      </div>
    </div>
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <div
        className="card p-5 shadow-lg"
        style={{ maxWidth: 500, width: "100%", borderRadius: 20 }}
      >
        <div className="text-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#1976d2"
            className="bi bi-person-check"
            viewBox="0 0 16 16"
          >
            <path d="M15.854 5.646a.5.5 0 0 0-.708-.708l-3 3a.5.5 0 0 0 .708.708l3-3zm-4.646 3.646a.5.5 0 0 0-.708-.708l-1.5 1.5a.5.5 0 0 0 .708.708l1.5-1.5z" />
            <path d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM4 5a3 3 0 1 0 6 0A3 3 0 0 0 4 5z" />
            <path d="M14 13s-1 0-1-1 1-4 1-4-1-1-4-1-4 1-4 1 1 4 1 4-1 1-1 1h10z" />
          </svg>
          <h2 className="mt-3" style={{ color: "#1976d2" }}>
            ¡Bienvenido!
          </h2>
          <p className="mb-0" style={{ color: "#1976d2" }}>
            Tu identidad fue validada correctamente
          </p>
        </div>
        <div className="mb-3 text-start">
          <div className="alert alert-info p-2 mb-2">
            <strong>ID de usuario:</strong> {result?.userId ?? "-"}
          </div>
          <strong>Score:</strong> {result?.score ?? "-"} <br />
          <strong>Nivel de riesgo:</strong> {result?.risk_level ?? "-"}
        </div>
        <button className="btn btn-primary w-100 mt-3">Ir a mi perfil</button>
      </div>
    </div>
  </div>
);

export default Home;
