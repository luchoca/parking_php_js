/* const formularioCrear = document.getElementById("formulario-crear");
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
      console.error("Error:", error);
    });
});

// Función para obtener la lista de vehículos
function obtenerVehiculos() {
  fetch("http://localhost:8888/parking-php-js/back/backend.php", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      listaVehiculos.innerHTML = ""; // Limpiar la lista
      data.forEach((vehiculo) => {
        const li = document.createElement("li");
        li.textContent = `${vehiculo.matricula} - ${vehiculo.marca} - ${vehiculo.modelo} - ${vehiculo.color} - Lugar: ${vehiculo.lugar}`;
        listaVehiculos.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Cargar la lista de vehículos al cargar la página
obtenerVehiculos();
 */

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

// Función para obtener la lista de vehículos
function obtenerVehiculos() {
  fetch("http://localhost:8888/parking-php-js/back/backend.php", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "La solicitud no fue exitosa. Estado HTTP: " + response.status
        );
      }
      return response.json();
    })
    .then((data) => {
      listaVehiculos.innerHTML = ""; // Limpiar la lista
      data.forEach((vehiculo) => {
        const li = document.createElement("li");
        li.textContent = `${vehiculo.matricula} - ${vehiculo.marca} - ${vehiculo.modelo} - ${vehiculo.color} - Lugar: ${vehiculo.lugar}`;
        listaVehiculos.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

// Cargar la lista de vehículos al cargar la página
obtenerVehiculos();
