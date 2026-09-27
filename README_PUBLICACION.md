# Laboratorio PNL 2026 v2 - publicacion

## Que cambia en esta version
- Los 3 casos modelo ahora incluyen teoria basica antes de cada test.
- Ejemplos guiados y pasos visuales para que el alumno deduzca el resultado.
- Resumen sencillo de Markov, TextRank, LDA, CNN, RNN y LLM.
- Busquedas preparadas para ampliar en Google.
- Mi reto usa numero de matricula en lugar de clave.
- Refuerzo: no se publican numeros de lista; se indica recuperar el equipo y el orden de exposicion de M2S1. El miercoles se expone.

## Publicar el portal Alumno
Subir a la raiz del repositorio de GitHub Pages:
- index.html
- app.js
- styles.css
- manifest.json
- sw.js
- .nojekyll
- carpeta shared/ con data.js

GitHub Pages: Settings -> Pages -> Deploy from a branch -> main -> /(root).

## Asignacion exacta por matricula
La interfaz pide una matrícula de exactamente 14 dígitos. Las 20 matrículas fueron vinculadas, en el orden recibido por el docente, con PNL-01 … PNL-20.

Por privacidad, las matrículas reales NO están escritas en el repositorio público. La página utiliza un índice hash local para encontrar la tarea correspondiente. El archivo maestro con la relación matrícula → tarea se conserva fuera de GitHub.

Esto no sustituye una autenticación de servidor: es una medida de separación de datos para que la lista de matrículas no quede publicada directamente.

## Conexion alumno-docente
La aplicacion Alumno es un sitio estatico y PWA. Practica y guarda el avance en el navegador. El alumno puede generar un archivo JSON. El panel Docente local importa esos JSON y genera indicadores. No hay respuestas enviadas en vivo.

## Para conexion en vivo
Se necesitara un backend con autenticacion y base de datos. La propuesta seria:
Alumno -> login/matricula -> API -> base de datos -> panel docente.
No se recomienda publicar secretos ni nombres de alumnos en el repositorio publico.
