# MicroSurveyLab - Frontend

Este repositorio contiene el frontend del proyecto MicroSurveyLab.
Desde aquí permito al usuario interactuar con el sistema de encuestas.
Ver, crear, responder y consultar resultados.

El frontend no intenta hacer más de lo necesario.
Su función es clara: consumir la API del backend y mostrar la información de forma directa.

## Enlaces públicos

Frontend publicado:
[https://robert2909.github.io/microsurveylab-frontend/](https://robert2909.github.io/microsurveylab-frontend/)

Repositorio en GitHub:
[https://github.com/Robert2909/microsurveylab-frontend](https://github.com/Robert2909/microsurveylab-frontend)

## Descripción general

Este frontend consume la API REST del backend.
Toda la comunicación se hace mediante peticiones HTTP y JSON.

No implemento lógica de negocio en el cliente.
Las decisiones importantes se resuelven en el backend.

Aquí solo valido lo básico.
Lo suficiente para no enviar datos incorrectos o incompletos.

## Tecnologías utilizadas

Elegí un stack ligero.
Sin capas innecesarias.

* Svelte
* JavaScript
* HTML
* CSS
* Fetch API

Cada herramienta cumple una función concreta.
No hay dependencias que no aporten al flujo principal.

## Ejecución en local

Para ejecutar el frontend en local utilizo:

* Node.js (versión LTS)
* npm

Pasos:

1. Clonar el repositorio

```bash
git clone https://github.com/Robert2909/microsurveylab-frontend
cd microsurveylab-frontend
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar en modo desarrollo

```bash
npm run dev
```

4. Abrir en el navegador

```bash
http://localhost:5173/
```

## Conexión con el backend

El frontend consume directamente la API publicada del backend.

La URL base se define en el archivo donde centralizo las peticiones.

URL utilizada:

```js
https://microsurveylab-backend-production.up.railway.app/api
```

No existe configuración dinámica.
La intención es mantener el flujo simple y transparente.

## Funcionalidades

Desde el frontend se puede:

* Visualizar encuestas
* Crear encuestas
* Responder encuestas activas
* Consultar resultados
* Editar información básica
* Eliminar encuestas

Cada acción corresponde a un endpoint del backend.
No hay lógica duplicada.

## Notas finales

El frontend está organizado por componentes.
Cada componente resuelve una tarea específica.

El código contiene comentarios de documentación.
Todo está pensado para que el flujo sea fácil de seguir y explicar durante la revisión.
