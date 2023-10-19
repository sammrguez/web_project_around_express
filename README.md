# Tripleten web_project_around_express

Esta es la primera parte de un proyecto que en su totalidad será un servidor para el proyecto "Alrededor de los EE. UU."

## Instalación

Asegúrate de tener Node.js y npm instalados en tu máquina. Luego, clona el repositorio y ejecuta el siguiente comando para instalar las dependencias necesarias:

npm install

## Uso

Asegúrate de configurar las variables de entorno necesarias, como el puerto en el que se ejecutará el servidor, si es necesario. Luego, puedes ejecutar el servidor usando el siguiente comando:

npm run start

### Endpoints

#### GET /users

Este endpoint devuelve una lista de usuarios.

#### GET /users/:id

Este endpoint verifica si un usuario con el ID especificado existe y devuelve la información del usuario si se encuentra. De lo contrario, devuelve un mensaje de error.
