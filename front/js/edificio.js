// edificio.js
export function mostrarVehiculosEnEdificio(vehiculos) {
  const edificio = document.getElementById("edificio");
  edificio.innerHTML = "";

  const edificioMatrix = Array.from({ length: 5 }, () => Array(10).fill(""));

  vehiculos.forEach((vehiculo) => {
    const lugar = vehiculo.lugar;
    if (lugar >= 1 && lugar <= 50) {
      const piso = Math.floor((lugar - 1) / 10);
      const lugarEnPiso = (lugar - 1) % 10;
      edificioMatrix[piso][lugarEnPiso] = `${vehiculo.matricula}`;
    }
  });

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

  const vehiculosActuales = vehiculos.length;
  const mensajeLleno = document.getElementById("mensaje-lleno");
  mensajeLleno.style.display = vehiculosActuales >= 50 ? "block" : "none";
}
