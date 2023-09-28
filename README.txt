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
   git clone https://github.com/luchoca/par
   

1.a O puedes descomprimir el archivo que se adjunta en el mail.

2. Abre tu aplicación MAMP y asegúrate de que los servicios de Apache y MySQL estén en ejecución.

3. Copia el contenido del proyecto en el directorio de documentos de tu servidor web local (por lo general, `htdocs` en MAMP).


4. Abre un navegador web y accede al proyecto en la siguiente dirección:
	8888 es el puerto q tengo config para APACHE en MAMP y luego la direccion donde esta mi proyecto.
   ```
   http://localhost:8888/parking-php-js/back/backend.php 
   ```

5
. Interactúa con la interfaz de usuario para registrar vehículos y asignarles lugares en el estacionamiento.

## Estructura de archivos

La estructura de archivos del proyecto es la siguiente:

- `index.html` y `edificio.html`: La página principal que muestra la interfaz de usuario del estacionamiento y el formulario de Registro.
- `style.css`: El archivo CSS que estiliza la interfaz de usuario.
- `script.js` `edificio.js`  `formulario.js`:Los archivos JavaScript que manejan la lógica de la interfaz de usuario.
- `backend.php`: El archivo PHP que se encarga de la conexión a la base de datos.
-  En la carpeta rutas se encuentra los archivos php donde se maneja el CRUD.
