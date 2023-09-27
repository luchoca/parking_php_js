<?php
$host = "localhost";
$usuario = "root";
$contrasena = "root";
$base_de_datos = "parking_bd";

$conexion = new mysqli($host, $usuario, $contrasena,$base_de_datos);

if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

?>
