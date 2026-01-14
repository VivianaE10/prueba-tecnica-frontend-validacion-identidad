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

-npm install
-npm run dev
-npm install bootstrap
-npm install react-router-dom

## 📚 ejecución 1

StartValidation — Pantalla de inicio de validación
Descripción

Interfaz inicial para iniciar el proceso de validación de identidad:
-Campo user_id (texto).
-Checkbox de consentimiento para uso de datos e imágenes.
-Botón Iniciar Validación.

Cómo probar

-Ejecutar npm run dev y abrir la aplicación.
-Enviar sin ID → debe mostrarse el mensaje: "Por favor, ingrese su ID de usuario."
-Ingresar ID sin marcar consentimiento → mostrar "Debe aceptar el consentimiento para continuar."
-Ingresar ID y marcar consentimiento → iniciar flujo de validación (placeholder).

Archivos relevantes

-StartValidation.jsx
-useStartValidation.js
