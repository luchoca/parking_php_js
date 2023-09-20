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
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Reemplaza con tu origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE"); // Agrega DELETE a los métodos permitidos
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Content-Type: application/json"); // Establecer el tipo de contenido como JSON

// Crear la base de datos si no existe
$crearBD = "CREATE DATABASE IF NOT EXISTS $base_de_datos";
if ($conexion->query($crearBD) === TRUE) {
} else {
    echo "Error al crear la base de datos: " . $conexion->error;
}

// Seleccionar la base de datos recién creada
$conexion->select_db($base_de_datos);

// Crear la tabla 'vehiculos' si no existe
$crearTabla = "CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL UNIQUE,  -- Añadimos UNIQUE para garantizar matrículas únicas
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    lugar INT NOT NULL
)";

if (!$conexion->query($crearTabla)) {
    echo "Error al crear la tabla 'vehiculos': " . $conexion->error;
}

// Ruta para crear un vehículo
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $matricula = $data->matricula;
    $marca = $data->marca;
    $modelo = $data->modelo;
    $color = $data->color;
    $lugar = $data->lugar;

    // Verificar si la matrícula ya existe en la base de datos
    $verificarMatricula = "SELECT id FROM vehiculos WHERE matricula = ?";
    $stmt_verificar = $conexion->prepare($verificarMatricula);
    $stmt_verificar->bind_param("s", $matricula);
    $stmt_verificar->execute();
    $stmt_verificar->store_result();

    if ($stmt_verificar->num_rows > 0) {
        // Ya existe un vehículo con la misma matrícula, responder con un error
        http_response_code(400);
        echo json_encode(array("message" => "La matrícula ya está registrada."));
    } else {
        // Insertar el nuevo vehículo en la base de datos
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

// Ruta para eliminar un vehículo
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    // Obtenemos el ID del vehículo a eliminar desde los parámetros de la URL
    $id = $_GET['id']; // Suponiendo que el parámetro se llama 'id'

    // Preparamos la consulta SQL para eliminar el vehículo
    $eliminarVehiculo = "DELETE FROM vehiculos WHERE id = ?";
    $stmt = $conexion->prepare($eliminarVehiculo);
    $stmt->bind_param("i", $id);

    // Ejecutamos la consulta SQL
    if ($stmt->execute()) {
        // Si la eliminación fue exitosa, respondemos con un código 204 (Sin contenido)
        http_response_code(204);
        exit(); // Salir sin enviar datos JSON
    } else {
        // Si hubo un error en la eliminación, respondemos con un código 500 (Error interno del servidor)
        http_response_code(500);
        echo json_encode(array("message" => "Error al eliminar el vehículo."));
        exit();
    }
}

// Cerrar la conexión
$conexion->close();
?>
