<?php
$host = "localhost";
$usuario = "root";
$contrasena = "root";
$base_de_datos = "parking_bd";

$conexion= new mysqli($host, $usuario, $contrasena);
/* $conexion=new mysqli($host, $usuario, $contrasena,$base_de_datos); */

if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}// Crear la base de datos si no existe

$crearBD = "CREATE DATABASE IF NOT EXISTS $base_de_datos";
if ($conexion->query($crearBD) === TRUE) {
    echo "Base de datos creada o ya existente.";
} else {
    echo "Error al crear la base de datos: " . $conexion->error;
}$conexion->select_db($base_de_datos);
// Crear la tabla vehiculos si no existe
$crearTabla = "CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    lugar INT NOT NULL UNIQUE
)";

if ($conexion->query($crearTabla) === TRUE) {
    echo "Tabla 'vehiculos' creada o ya existente.";
} else {
    echo "Error al crear la tabla 'vehiculos': " . $conexion->error;
}

$conexion->close();
?>
