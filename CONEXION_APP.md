# Conexion de la app

## Version actual (segura y sencilla para el 30 de septiembre)

```text
                INTERNET
                   |
           Google Classroom
                   |
                   v
          GitHub Pages (publico)
                   |
           Portal Alumno PWA
                   |
          +--------+--------+
          |                 |
       teoria            practica
          |                 |
          +--------+--------+
                   |
              Mi matricula
                   |
             Mi reto individual
                   |
             practica local
                   |
          exportar avance JSON
                   |
                   v
         PC / USB del docente
                   |
            Panel Docente
                   |
      graficas + errores + temas
```

### Lo que SI hace
- El alumno estudia teoria, ejemplos y mini tests.
- El alumno recibe una variante individual usando su matricula.
- Puede trabajar con o sin Internet despues de la primera carga.
- Puede generar un JSON de avance.
- El docente importa varios JSON y obtiene un analisis local.

### Lo que NO hace
- No guarda las respuestas de todos los alumnos en un servidor.
- El docente no ve en vivo la pantalla del alumno.
- GitHub Pages no debe contener el panel docente.

## Version futura (conexion en vivo)

```text
Alumno -> autenticacion -> API/backend -> base de datos
                                      |
                                      v
                               Panel Docente
```

Esta segunda etapa requiere autenticacion, reglas de acceso y una base de datos. Es mejor implementarla despues de validar la actividad presencial.
