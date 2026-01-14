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

## Cómo probar

-Ejecutar npm run dev y abrir la aplicación.
-Enviar sin ID → debe mostrarse el mensaje: "Por favor, ingrese su ID de usuario."
-Ingresar ID sin marcar consentimiento → mostrar "Debe aceptar el consentimiento para continuar."
-Ingresar ID y marcar consentimiento → iniciar flujo de validación (placeholder).

## Archivos relevantes

-StartValidation.jsx
-useStartValidation.js

## 📸 Ejecución 2 – Captura de imágenes en vivo

### Descripción general

Flujo secuencial de captura de imágenes directamente desde la cámara del dispositivo. Después de validar el formulario inicial (ID + consentimiento), el usuario accede a una pantalla que le guía para capturar **3 fotografías obligatorias en orden**:

1. **Cédula — Frente** (cámara trasera)
2. **Cédula — Reverso** (cámara trasera)
3. **Selfie** (cámara frontal)

Cada captura incluye:

- ✅ Vista previa en vivo (video stream)
- ✅ Botón "Tomar foto" para capturar el fotograma actual
- ✅ Preview de la foto tomada
- ✅ Opción "Volver a tomar" para repetir la captura
- ✅ Botón "Aceptar" para confirmar y avanzar

Al completar las 3 fotos, se muestra un **resumen** con confirmación de todas las imágenes capturadas antes de enviar a validación.

### Componentes implementados

#### 1. **useCamera.js** (Hook personalizado)

- **Ubicación:** `src/hooks/useCamera.js`
- **Responsabilidad:** Gestiona toda la lógica de la cámara
- **Funciones principales:**
  - `start(constraints)` — inicia el stream de video usando `navigator.mediaDevices.getUserMedia()`
  - `stop()` — detiene el stream y libera la cámara
  - `capture()` — captura el fotograma actual desde el video y devuelve un DataURL (base64)
  - `ready` — estado que indica si la cámara está lista para capturar
  - `error` — mensajes de error (ej. permisos denegados, cámara no disponible)

#### 2. **CameraStep.jsx** (Componente UI de un paso)

- **Ubicación:** `src/components/CaptureFlow/CameraStep.jsx`
- **Responsabilidad:** Renderiza la UI de un paso de captura (frente, reverso o selfie)
- **Características:**
  - Muestra video en vivo o preview según estado
  - Utiliza el hook `useCamera` para controlar la cámara
  - Maneja dos estados:
    - **Sin captura:** muestra video en vivo + botón "Tomar foto"
    - **Con captura:** muestra preview + botones "Volver a tomar" / "Aceptar"
      Soporta cambio de cámara (`facingMode: 'environment'` para reverso, `'user'` para selfie)

#### 3. **CaptureFlow.jsx** (Coordinador del flujo)

- **Ubicación:** `src/components/CaptureFlow/CaptureFlow.jsx`
- **Responsabilidad:** Controla el flujo secuencial de los 3 pasos
- **Características:**
  - Gestiona el índice del paso actual (0 = frente, 1 = reverso, 2 = selfie)
  - Almacena las 3 imágenes capturadas en estado
  - Renderiza dinámicamente `CameraStep` para el paso actual
  - Después de capturar las 3 fotos, muestra un **resumen** en lugar de abrir otra captura
  - Valida que todas las imágenes estén presentes antes de permitir envío

### Flujo de usuario paso a paso

1. **Formulario inicial** → Ingresar user_id, marcar consentimiento, clicar **"Iniciar Validación"**
2. **CaptureFlow se abre** → Muestra "Paso 1 de 3: Cédula — Frente"
3. **CameraStep Paso 1** → Video en vivo de cámara trasera
   - Clicar **"Tomar foto"** → captura y muestra preview
   - Clicar **"Aceptar"** → guarda frente, avanza a Paso 2
4. **CameraStep Paso 2** → Video en vivo (reverso)
   - Repetir: tomar foto → aceptar → avanza a Paso 3
5. **CameraStep Paso 3** → Video en vivo de cámara frontal (selfie)
   - Repetir: tomar foto → aceptar → **no avanza**
   6. **Resumen** → Muestra "✅ Las 3 imágenes han sido capturadas correctamente"
   - Lista: ✓ Cédula - Frente, ✓ Cédula - Reverso, ✓ Selfie
6. **Botón "Enviar a validación"** → Prepara payload y envía imágenes al backend

### Notas técnicas

- **getUserMedia API:** Requiere **HTTPS** en producción o **localhost** en desarrollo. Si falla en desktop, añadir fallback a `<input type="file" accept="image/*">`
- **Permisos:** El navegador pide permiso una única vez por sesión
- **Canvas para captura:** Utiliza un canvas invisible para dibujar el fotograma actual del video y convertirlo a base64
- **Key en CameraStep:** Cada paso tiene una `key` única para forzar que React remonte el componente (evita bugs de estado entre pasos)
- **useCallback:** Las funciones del hook usan `useCallback` para evitar re-renders innecesarios

### Archivos relevantes

- `src/hooks/useCamera.js`
- `src/components/CaptureFlow/CaptureFlow.jsx`
- `src/components/CaptureFlow/CameraStep.jsx`
- `src/components/StartValidation/StartValidation.jsx` (integración)
- `src/components/StartValidation/useStartValidation.js` (validación inicial)
