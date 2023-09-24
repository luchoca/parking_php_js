const formularioCrear = document.getElementById("formulario-crear");
const listaVehiculos = document.getElementById("lista-vehiculos");

// Event listener para el formulario de creación
formularioCrear.addEventListener("submit", (e) => {
  e.preventDefault();

  const matriculaInput = document.getElementById("matricula");
  const marcaInput = document.getElementById("marca");
  const modeloInput = document.getElementById("modelo");
  const colorInput = document.getElementById("color");
  const lugarInput = document.getElementById("lugar");

  const matricula = matriculaInput.value;
  const marca = marcaInput.value;
  const modelo = modeloInput.value;
  const color = colorInput.value;
  const lugar = parseInt(lugarInput.value);

  const nuevoVehiculo = {
    matricula: matricula,
    marca: marca,
    modelo: modelo,
    color: color,
    lugar: lugar,
  };

  fetch("http://localhost:8888/parking-php-js/back/backend.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoVehiculo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);

      // Limpiar los campos del formulario
      matriculaInput.value = "";
      marcaInput.value = "";
      modeloInput.value = "";
      colorInput.value = "";
      lugarInput.value = "";

      // Obtén la cantidad actual de vehículos en la lista
      const vehiculosActuales = listaVehiculos.querySelectorAll("li").length;

      if (vehiculosActuales >= 50) {
        // Mostrar el mensaje de estacionamiento lleno
        const mensajeLleno = document.getElementById("mensaje-lleno");
        mensajeLleno.style.display = "block"; // Mostrar el mensaje en pantalla

        console.log(
          "El estacionamiento está lleno. No se puede agregar más vehículos."
        );
        return;
      }
      // Actualizar la lista de vehículos después de crear uno
      obtenerVehiculos();
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
});

function obtenerVehiculos() {
  console.log("Obteniendo la lista de vehículos...");
  fetch("http://localhost:8888/parking-php-js/back/backend.php", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        // Mostrar un mensaje si la respuesta no es exitosa
        const mensajeError = document.createElement("p");
        mensajeError.textContent = "No se pudo obtener la lista de vehículos.";
        listaVehiculos.appendChild(mensajeError);
        return [];
      }
      return response.json();
    })
    .then((data) => {
      listaVehiculos.innerHTML = ""; // Limpiar la lista
      if (data.length === 0) {
        // Si no hay vehículos, mostrar un mensaje o realizar alguna acción
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "El PARKING esta vacío";
        listaVehiculos.appendChild(mensajeVacio);
      } else {
        agregarVehiculosAlEdificio(data); // Llama a la función para mostrar los vehículos en el edificio
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

// Función para eliminar un vehículo por ID
function eliminarVehiculo(id) {
  fetch(`http://localhost:8888/parking-php-js/back/backend.php?id=${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "La solicitud no fue exitosa. Estado HTTP: " + response.status
        );
      }
      obtenerVehiculos(); // Actualiza la lista después de eliminar
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

// Cuando obtengas la lista de vehículos, llama a la función para mostrarlos en el edificio
function agregarVehiculosAlEdificio(vehiculos) {
  // Obtén el elemento contenedor del edificio
  const edificio = document.getElementById("edificio");

  // Limpiar el contenido del edificio
  edificio.innerHTML = "";

  // Crear una matriz bidimensional para representar el edificio
  const edificioMatrix = [];

  // Llenar la matriz con espacios en blanco para cada lugar en el edificio
  for (let i = 0; i < 5; i++) {
    edificioMatrix.push([]);
    for (let j = 0; j < 10; j++) {
      edificioMatrix[i][j] = "";
    }
  }

  // Colocar los vehículos en la matriz según su lugar
  vehiculos.forEach((vehiculo) => {
    const lugar = vehiculo.lugar;
    if (lugar >= 1 && lugar <= 50) {
      const piso = Math.floor((lugar - 1) / 10);
      const lugarEnPiso = (lugar - 1) % 10;
      edificioMatrix[piso][lugarEnPiso] = `${vehiculo.matricula}`;
    }
  });

  // Crear y agregar elementos HTML para representar el edificio
  for (let i = 0; i < 5; i++) {
    const pisoDiv = document.createElement("div");
    pisoDiv.classList.add("piso");
    for (let j = 0; j < 10; j++) {
      const lugarDiv = document.createElement("div");
      lugarDiv.classList.add("lugar");
      lugarDiv.textContent = edificioMatrix[i][j];
      pisoDiv.appendChild(lugarDiv);
    }
    edificio.appendChild(pisoDiv);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const botonVerEdificio = document.getElementById("ver-edificio");

  if (botonVerEdificio) {
    botonVerEdificio.addEventListener("click", () => {
      const ventanaEdificio = window.open("edificio.html", "_blank");
    });
  }
});

// Cargar la lista de vehículos al cargar la página
obtenerVehiculos();
