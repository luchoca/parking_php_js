import { initForm } from "./formulario.js";
import { mostrarVehiculosEnEdificio } from "./edificio.js";

document.addEventListener("DOMContentLoaded", () => {
  initForm();
  obtenerVehiculos();
});

async function obtenerVehiculos() {
  try {
    const response = await fetch(
      "http://localhost:8888/parking-php-js/back/routes/list_vehicles.php",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    const listaVehiculos = document.getElementById("lista-vehiculos");

    listaVehiculos.innerHTML = ""; // Limpiar la lista
    if (data.length === 0) {
      const mensajeVacio = document.createElement("p");
      mensajeVacio.textContent = "El PARKING está vacío";
      listaVehiculos.appendChild(mensajeVacio);
    } else {
      mostrarVehiculosEnEdificio(data);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

export { obtenerVehiculos };
