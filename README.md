# Proyecto Final del curso de BACKEND

Este proyecto es el backend de un ecommerce desarrollado en Express, utilizando la arquitectura MVC. El objetivo principal es proporcionar una plataforma eficiente y escalable para la gestión de productos, pedidos y usuarios de un comercio electrónico.

## Características

* Arquitectura MVC para una estructura modular y fácil de mantener.

* Gestión de productos, incluyendo creación, actualización y eliminación.

* Soporte para la creación de carritos de compras.

* Autenticación y autorización de usuarios gestionados con passport.js

* Integración con una base de datos relacional y/o no relacional para almacenar datos de productos, usuarios y pedidos.

* API RESTful para interactuar con el backend desde aplicaciones móviles o frontend.

* Implementacion de plantillas ejs para servir tambien el frontend.

## Instalacion

1. Clona el repositorio.

2. Instala las dependencias utilizando el comando

    ```sh
        npm install
    ```

3. Crea un archivo .env en la raiz del proyecto con las siguientes variables de entorno (los valores son a modo ilustrativo):
    ```sh
    NODE_ENV='development'
    PORT=8080 (o el que quieras)
    PERSISTANCE='memoria'
    SESSIONTIME=2 (tiempo de session)
    URL_MONGO='URL-de-tu-base-de-datos-MONGODB'
    SECRET_SESSION_MONGO='clave-secreta-para-la-session-mongo'
    SECRET_JWT='clave-secreta-para-generar-token-JWT'
    USER_MAILADMIN='tumail@mail.com'
    PASS_MAILADMIN='clave-secreta-para-confugurar-mail'
    ```

4. Correr el proyecto

    La aplicacion consta de dos ramas. La principal "main" es la que tambien sirve el Front a traves de plantillas "ejs" y autenticacion con passport-local, mientras quen la segunda "jwt" despliega solo el back, o sea, sin plantillas y la autenticacion es por medio de un Json Web Token.

    - Para correrlo en modo desarrollo utiliza el siguiente comando:

        ```sh
            npm run dev
        ```
        Este comando ejecuta la aplicacion con "nodemon" para reiniciar el servidor cuando detecta algun cambio en el codigo fuente y ademas persiste en memoria, por lo que genera 10 productos aleatorios en la base de datos para poder trabajar.

    - Para correrlo en modo produccion ejecuta el comando:

        ```sh
            npm run prod
        ```
        Persiste en tu base de datos MONGODB


## Documentacion de la API

La documentacion de la API la encontras en el siguiente link: [Documentacion](https://documenter.getpostman.com/view/21750027/2sA3XPC2w2)