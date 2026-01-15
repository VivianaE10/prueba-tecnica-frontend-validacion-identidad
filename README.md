# Validación de Identidad – MUBIS

Prueba técnica Front-End para validación de identidad mediante captura en vivo de cámara.

## 🚀 Tecnologías

- React + Vite
- React Router
- Hooks de React:
  - useState
  - useEffect
  - useRef
  - useCallback
- Hooks personalizados:
  - useCamera (gestión de cámara y captura de imágenes)
  - useValidation (simulación y manejo de validación de identidad)
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

Ejecuta `npm run dev` y abre la aplicación.
El campo de ID de usuario aparece con el valor quemado `USR-SELLER-1C701FE1`, que me proporcionaron para la prueba técnica, y está deshabilitado (no editable), solo como referencia.
Para iniciar la validación, únicamente debes marcar el checkbox de consentimiento y presionar el botón. El ID no se valida, solo el consentimiento.

Esto cumple con el requerimiento original: el ID es el que me proporcionaron y queda como dato quemado, pero la validación solo depende del consentimiento.

## Archivos relevantes

-StartValidation.jsx
-useStartValidation.js

## 📸 Ejecución 2 – Captura de imágenes en vivo

### Descripción general

Flujo secuencial de captura de imágenes directamente desde la cámara de la computadora (desktop) usando React Web. La aplicación está diseñada y probada para funcionar en navegadores modernos de escritorio que permitan el acceso a la cámara web.

Después de validar el formulario inicial (ID + consentimiento), el usuario accede a una pantalla que le guía para capturar **3 fotografías obligatorias en orden**:

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
  - `start(constraints)` — inicia el stream de video (acceso a la cámara)
  - `stop()` — detiene el stream (libera la cámara)
  - `capture()` — toma una foto (devuelve imagen en base64)
  - `ready` — indica si la cámara está lista para capturar (true/false)
  - `error` — contiene el mensaje de error si ocurre algún problema (por ejemplo, permisos denegados o cámara no disponible)

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

## 📦 Ejecución 3 – Validación y Envío a Backend

### Descripción general

Tras capturar las 3 imágenes y confirmar el resumen, la app prepara el payload y lo envía a un endpoint de validación. El flujo está desacoplado mediante un **hook personalizado** que permite alternar entre:

- **Simulación de respuesta** (por defecto, para desarrollo y pruebas)
- **Llamada real al endpoint** (comentada, lista para producción)

### Componentes implementados

#### 1. **useValidation.js** (Hook de validación)

- **Ubicación:** `src/hooks/useValidation.js`
- **Responsabilidad:** Gestiona el envío de imágenes y el manejo de la respuesta (real o simulada)
- **Características:**
  - Prepara un `FormData` con los campos:
    - `user_id` (string)
    - `selfie` (archivo)
    - `cedula_frente` (archivo)
    - `cedula_reverso` (archivo)
  - **Simulación:** Por defecto, la función retorna un resultado simulado tras 3 segundos (aprobado/rechazado)
  - **Llamada real:** El bloque de fetch al endpoint está comentado y listo para activarse
  - Maneja estados: `loading`, `error`, `success`, `result`

#### 2. **ProcessingScreen.jsx**

- **Ubicación:** `src/components/ProcessingScreen/ProcessingScreen.jsx`
- **Responsabilidad:** Muestra pantalla de carga y resultado de validación
- **Características:**
  - Llama a `validateIdentity` con los datos capturados
  - Muestra spinner de carga, errores o resultado

#### 3. **StartValidation.jsx**

- **Ubicación:** `src/components/StartValidation/StartValidation.jsx`
- **Responsabilidad:** Orquesta el flujo completo (formulario, captura, procesamiento)

### Flujo de usuario paso a paso

1. **Resumen de imágenes** → Botón **"Enviar a validación"**
2. **Pantalla de procesamiento** → Spinner y mensaje "Validando identidad..."
3. **Resultado**:
   - Si aprobado: muestra mensaje de éxito y redirige al Home
   - Si rechazado: muestra mensaje de rechazo y opciones de reintentar o volver al inicio

### Notas sobre el endpoint y simulación

🔒 **Importante:** El endpoint real que me proporcionaron para la prueba técnica es:
`https://mubis.app/api/cedula/validate-complete`
Sin embargo, este endpoint no se deja consumir y devuelve error 422 al enviar los datos. Por eso, implementé una simulación en el código para poder mostrar el flujo completo y las instrucciones de la lógica.

La aplicación está configurada para usar únicamente la simulación, lo que permite probar el flujo de validación y los distintos resultados (aprobado/rechazado) sin depender del backend.

Si quieres probar ambos casos, solo debes cambiar el valor de `approved` en el objeto `fakeResult` dentro de `src/hooks/useValidation.js`.

No recomiendo intentar consumir el endpoint real, ya que no responde correctamente y genera errores.

---

## ⚠️ NOTAS IMPORTANTES PARA PRUEBAS Y DESARROLLO

> **Nota 1:**
> En `src/hooks/useValidation.js` puedes **descomentar la línea 18** para forzar y visualizar el manejo de errores en la interfaz de validación.
>
> ```js
> // throw new Error("Simulación de error en validación");
> ```

> **Nota 2:**
> En el mismo archivo, **cambia el valor de `approved` a `false` en la línea 70** para probar el flujo de resultado NO aprobado (rechazado).
>
> ```js
> const fakeResult = {
>   approved: false, // Cambia a true para el caso aprobado
>   ...
> }
> ```

> **Nota 3:**
> El endpoint real que me proporcionaron (`https://mubis.app/api/cedula/validate-complete`) devolvía error 422 al enviar los datos, por lo que implementé una simulación en el código para poder probar y mostrar todo el flujo de la aplicación. Si la imagen del error no se visualiza, simplemente ten en cuenta que el error 422 impide consumir el endpoint y por eso la simulación es necesaria.

---

## 🧠 Ejecución 4 – Manejo de resultado y Home

### Descripción general

Tras la validación, la app muestra una pantalla de resultado:

- **Aprobado:** Mensaje de éxito y opción de ir al Home.
- **Rechazado:** Mensaje claro y amigable, opción de reintentar o volver al inicio (NO muestra Home).

#### Componentes clave

- `ResultScreen.jsx`: Muestra el resultado y las acciones según el caso.
- `Home.jsx`: Pantalla final con mensaje de bienvenida y datos del resultado.

### Cómo probar ambos casos

- Cambia el valor de `approved` en `useValidation.js` para alternar entre aprobado y rechazado.
- Usa la línea de error para probar el manejo visual de errores.

---
