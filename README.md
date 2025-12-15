# MicroSurveyLab - Frontend

Este repositorio contiene el frontend del proyecto MicroSurveyLab.
Desde aquí el usuario interactúa con el sistema de encuestas: crea encuestas, responde y consulta resultados.

El objetivo del frontend es uno solo: ofrecer una interfaz clara que consuma la API del backend sin lógica innecesaria.

## Enlaces públicos

Frontend publicado:
[https://robert2909.github.io/microsurveylab-frontend/](https://robert2909.github.io/microsurveylab-frontend/)

Repositorio en GitHub:
[https://github.com/Robert2909/microsurveylab-frontend](https://github.com/Robert2909/microsurveylab-frontend)

## Descripción general

El frontend consume directamente la API REST del backend.
Toda la comunicación se realiza mediante peticiones HTTP y JSON.

No existe lógica de negocio compleja en el cliente.
Las validaciones son mínimas y solo buscan evitar errores evidentes antes de enviar datos al backend.

## Tecnologías utilizadas

Se utilizó un stack ligero, enfocado en simplicidad:

* Svelte
* JavaScript
* HTML
* CSS
* Fetch API

No se añadieron frameworks adicionales que no aportaran valor directo.

## Ejecución en local

Para ejecutar el frontend en local se requiere:

* Node.js (versión LTS recomendada)
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

El frontend consume la API publicada del backend.
La URL base se define directamente en el archivo de configuración de la capa de acceso a datos.

Ejemplo de URL utilizada:

```js
https://microsurveylab-backend-production.up.railway.app/api
```

## Funcionalidades

Desde el frontend se pueden realizar las siguientes acciones:

* Visualizar encuestas existentes
* Crear nuevas encuestas
* Responder encuestas activas
* Consultar resultados de votación
* Editar información básica de una encuesta
* Eliminar encuestas

Cada acción corresponde directamente a un endpoint del backend.

## Notas finales

El frontend está organizado por componentes.
Cada componente cumple una función específica dentro del flujo de la aplicación.

El código contiene comentarios de documentación.
La prioridad fue mantener el flujo entendible y fácil de explicar durante la revisión.

Quedó bonita la documentación.
