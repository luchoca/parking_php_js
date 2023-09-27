<?php

$host = "localhost";
$usuario = "lcastrosaad";
$contraseña = "12345";
$base_de_datos = "parking_bd";

$conexion = new mysqli($host, $usuario, $contraseña, $base_de_datos);

if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

?>
