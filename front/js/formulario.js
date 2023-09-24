// formulario.js
export function initForm() {
  const formularioCrear = document.getElementById("formulario-crear");
  formularioCrear.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoVehiculo = obtenerDatosFormulario();

    try {
      await enviarDatosAlServidor(nuevoVehiculo);

      limpiarFormulario();
      obtenerVehiculos();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });
}

export async function enviarDatosAlServidor(nuevoVehiculo) {
  try {
    const response = await fetch(
      "http://localhost:8888/parking-php-js/back/backend.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVehiculo),
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    throw error;
  }
}

export function limpiarFormulario() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

function obtenerDatosFormulario() {
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

  return {
    matricula,
    marca,
    modelo,
    color,
    lugar,
  };
}
