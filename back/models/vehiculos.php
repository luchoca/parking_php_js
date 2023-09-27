<?php
class Vehicle
{
    private $conn;
    private $table_name = "vehiculos";

    public $id;
    public $matricula;
    public $marca;
    public $modelo;
    public $color;
    public $lugar;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Métodos para interactuar con la base de datos relacionados con los vehículos
    // Ejemplo de método para crear un vehículo
    function create()
    {
        // Código para crear un vehículo en la base de datos
    }

    // Ejemplo de método para listar vehículos
    function read()
    {
        // Código para listar vehículos desde la base de datos
    }

    // Ejemplo de método para eliminar un vehículo
    function delete()
    {
        // Código para eliminar un vehículo de la base de datos
    }
}
?>
