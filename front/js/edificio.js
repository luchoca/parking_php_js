import { obtenerVehiculos } from "./script.js";

// Función para mostrar los vehículos en el edificio
export function mostrarVehiculosEnEdificio(vehiculos) {
  const edificio = document.getElementById("edificio");
  edificio.innerHTML = "";

  const edificioMatrix = Array.from({ length: 5 }, () => Array(10).fill(null));

  vehiculos.forEach((vehiculo) => {
    const lugar = vehiculo.lugar;
    if (lugar >= 1 && lugar <= 50) {
      const piso = Math.floor((lugar - 1) / 10);
      const lugarEnPiso = (lugar - 1) % 10;
      edificioMatrix[piso][lugarEnPiso] = vehiculo;
    }
  });

  for (let i = 0; i < 5; i++) {
    const pisoDiv = document.createElement("div");
    pisoDiv.classList.add("piso");
    for (let j = 0; j < 10; j++) {
      const lugarDiv = document.createElement("div");
      lugarDiv.classList.add("lugar");
      const vehiculo = edificioMatrix[i][j];
      if (vehiculo) {
        lugarDiv.textContent = `${vehiculo.matricula} - Lugar ${vehiculo.lugar}`;
        lugarDiv.classList.add("ocupado");

        // Agrega un botón para desocupar el lugar
        const desocuparBtn = document.createElement("button");
        desocuparBtn.textContent = "Desocupar";
        desocuparBtn.addEventListener("click", () => {
          // Llama a la función para desocupar el lugar y pasa el vehículo como argumento
          desocuparLugar(vehiculo);
        });
        lugarDiv.appendChild(desocuparBtn);
      } else {
        lugarDiv.textContent = `Lugar ${i * 10 + j + 1}`;
        lugarDiv.classList.add("libre");
      }
      pisoDiv.appendChild(lugarDiv);
    }
    edificio.appendChild(pisoDiv);
  }

  const vehiculosActuales = vehiculos.length;
  const mensajeLleno = document.getElementById("mensaje-lleno");
  mensajeLleno.style.display = vehiculosActuales >= 50 ? "block" : "none";
}
// Función para desocupar un lugar y eliminar el vehículo
export function desocuparLugar(vehiculo) {
  // Realiza una solicitud DELETE al backend PHP para eliminar el vehículo
  fetch(
    `http://localhost:8888/parking-php-js/back/routes/delete_vehicle.php?id=${vehiculo.id}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (response.status === 204) {
        // Éxito: el vehículo se eliminó correctamente
        alert("El vehículo se eliminó correctamente.");
        obtenerVehiculos();
        // Actualiza la interfaz de usuario para reflejar la eliminación
        // Esto podría incluir recargar la lista de vehículos en el edificio.
      } else {
        // Error: algo salió mal
        alert("Error al eliminar el vehículo.");
      }
    })
    .catch((error) => {
      console.error("Hubo un error al realizar la solicitud:", error);
    });
  console.log(`Eliminando vehículo con ID: ${vehiculo.id}`);
}
