const formularioCrear = document.getElementById("formulario-crear");
const listaVehiculos = document.getElementById("lista-vehiculos");

// Event listener para el formulario de creación
formularioCrear.addEventListener("submit", (e) => {
  e.preventDefault();

  const matricula = document.getElementById("matricula").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const color = document.getElementById("color").value;
  const lugar = parseInt(document.getElementById("lugar").value);

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
        mensajeVacio.textContent = "El PARKING esta vacio";
        listaVehiculos.appendChild(mensajeVacio);
      } else {
        data.forEach((vehiculo) => {
          const li = document.createElement("li");
          li.textContent = `${vehiculo.matricula} - ${vehiculo.marca} - ${vehiculo.modelo} - ${vehiculo.color} - Lugar: ${vehiculo.lugar}`;
          listaVehiculos.appendChild(li);
        });
        agregarBotonesEliminar(data);
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

// Cargar la lista de vehículos al cargar la página
obtenerVehiculos();

function agregarBotonesEliminar(vehiculos) {
  const listaVehiculos = document.getElementById("lista-vehiculos");

  // Limpiar la lista antes de agregar elementos
  listaVehiculos.innerHTML = "";

  // Iterar a través de los vehículos y crear elementos de lista con botones de eliminar
  vehiculos.forEach((vehiculo) => {
    const li = document.createElement("li");
    li.textContent = `${vehiculo.matricula} - ${vehiculo.marca} - ${vehiculo.modelo} - ${vehiculo.color} - Lugar: ${vehiculo.lugar}`;

    // Agregar botón de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      eliminarVehiculo(vehiculo.id);
      obtenerVehiculos();
    });

    li.appendChild(botonEliminar);
    listaVehiculos.appendChild(li);
  });
}
