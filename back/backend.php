<?php
// Conexión a la base de datos (Reemplaza con tus credenciales)
$host = "localhost";
$usuario = "lcastrosaad";
$contraseña = "12345";
$base_de_datos = "parking_bd";

$conexion = new mysqli($host, $usuario, $contraseña, $base_de_datos);

if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}
// Establecer encabezados CORS
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Permitir los métodos HTTP que necesites
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json"); // Establecer el tipo de contenido como JSON

// Crear la base de datos si no existe
$crearBD = "CREATE DATABASE IF NOT EXISTS $base_de_datos";
if ($conexion->query($crearBD) === TRUE) {
    // La base de datos se crea sin necesidad de mensajes adicionales
} else {
    echo "Error al crear la base de datos: " . $conexion->error;
}

// Seleccionar la base de datos recién creada
$conexion->select_db($base_de_datos);

// Crear la tabla 'vehiculos' si no existe
$crearTabla = "CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    lugar INT NOT NULL
)";

if ($conexion->query($crearTabla) === TRUE) {
    // La tabla se crea sin necesidad de mensajes adicionales
} else {
    echo "Error al crear la tabla: " . $conexion->error;
}

// Ruta para crear un vehículo
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $matricula = $data->matricula;
    $marca = $data->marca;
    $modelo = $data->modelo;
    $color = $data->color;
    $lugar = $data->lugar;

    $insertarVehiculo = "INSERT INTO vehiculos (matricula, marca, modelo, color, lugar)
                        VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conexion->prepare($insertarVehiculo);
    $stmt->bind_param("ssssi", $matricula, $marca, $modelo, $color, $lugar);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Vehículo creado con éxito."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error al crear el vehículo."));
    }
}

// Ruta para listar vehículos
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $listarVehiculos = "SELECT * FROM vehiculos";
    $resultado = $conexion->query($listarVehiculos);

    if ($resultado->num_rows > 0) {
        $vehiculos = array();
        while ($fila = $resultado->fetch_assoc()) {
            $vehiculos[] = $fila;
        }
        http_response_code(200);
        echo json_encode($vehiculos);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No hay vehículos registrados."));
    }
}

// Cerrar la conexión
$conexion->close();
?>




