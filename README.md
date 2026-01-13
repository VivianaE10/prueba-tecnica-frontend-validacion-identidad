# Validación de Identidad – MUBIS

Prueba técnica Front-End para validación de identidad mediante captura en vivo de cámara.

## 🚀 Tecnologías

- React + Vite
- React Router
- Hooks (useState, useEffect)
- Fetch

## 📸 Flujo de la aplicación

1. Pantalla inicial con ingreso de `user_id` y consentimiento.
2. Captura de imágenes:
   - Cédula (frente)
   - Cédula (reverso)
   - Selfie
3. Envío a API de validación
4. Resultado:
   - Aprobado → redireccion al Home
   - Rechazado → opcion de Reintentar o volver al inicio
5. Pantalla Home con información básica del resultado.

## ▶️ Instalación y ejecución

npm install
npm run dev
npm install bootstrap
npm install react-router-dom
