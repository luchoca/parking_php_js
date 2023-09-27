# Proyecto de Estacionamiento - README

Este proyecto de estacionamiento te permite registrar vehículos y asignarles lugares en un estacionamiento simulado con 5 pisos y 10 lugares por piso, para un total de 50 lugares disponibles. El proyecto utiliza PHP, MySQL y JavaScript para lograr esta funcionalidad.

## Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- [MAMP](https://www.mamp.info/) (o alguna alternativa para ejecutar un servidor web local y MySQL).
- Navegador web moderno.
- Editor de código (recomendado: Visual Studio Code).

## Instrucciones de configuración

Sigue estos pasos para configurar y ejecutar el proyecto:

1. Clona este repositorio en tu computadora:

   ```shell
   git clone https://github.com/luchoca/parking_php_js
   ```
1.a O puedes descomprimir el archivo que se adjunta en el mail.

2. Abre tu aplicación MAMP y asegúrate de que los servicios de Apache y MySQL estén en ejecución.

3. Copia el contenido del proyecto en el directorio de documentos de tu servidor web local (por lo general, `htdocs` en MAMP).

4. Configura la base de datos:
   
   - Abre el panel de control de MAMP.
   - Navega a la pestaña "Tools" y selecciona "phpMyAdmin".
   - Crea una nueva base de datos llamada `estacionamiento` y ejecuta el script SQL en `backend.php` para crear la tabla necesaria.

5. Abre un navegador web y accede al proyecto en la siguiente dirección:
	8888 es el puerto q tengo config para APACHE en MAMP y luego la direccion donde esta mi proyecto.
   ```
   http://localhost:8888/parking-php-js/back/backend.php 
   ```

6. Interactúa con la interfaz de usuario para registrar vehículos y asignarles lugares en el estacionamiento.

## Estructura de archivos

La estructura de archivos del proyecto es la siguiente:

- `index.html`: La página principal que muestra la interfaz de usuario del estacionamiento.
- `style.css`: El archivo CSS que estiliza la interfaz de usuario.
- `script.js`: El archivo JavaScript que maneja la lógica de la interfaz de usuario.
- `backend.php`: El archivo PHP que se encarga de la conexión a la base de datos y las operaciones CRUD.

## Contribuciones y problemas

Si deseas contribuir o informar sobre problemas, no dudes en abrir una solicitud de extracción (pull request) o un problema (issue) en este repositorio. Estamos encantados de recibir contribuciones y mejorar este proyecto.

¡Disfruta de tu proyecto de estacionamiento!