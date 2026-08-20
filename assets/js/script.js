const montoInput = document.querySelector("#monto");
const divisaSelected = document.querySelector("#divisas");
const btnConv = document.querySelector("#btn-conversion");
const montoConvertido = document.querySelector("#resultado-conversion");

let miGrafico = null;

async function llamadoDivisas() {
  try {
    const res = await fetch("https://mindicador.cl/api/");
    const divisas = await res.json();
    return divisas;
  } catch (error) {
    alert(error.message);
  }
}

async function llamadoHistorial(codigoDivisa) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${codigoDivisa}`);
    const data = await res.json();
    return data.serie;
  } catch (error) {
    alert(error.message);
  }
}

async function convertirDivisas() {
  const monto = Number(montoInput.value);
  const divisaElegida = divisaSelected.value;

  if (monto <= 0) {
    alert("Ingresa un monto mayor a 0 :v");
    return null;
  }

  const divisas = await llamadoDivisas();
  const conversion = monto * divisas[divisaElegida].valor;
  montoConvertido.textContent = `Son: ${conversion.toFixed(2)} CLP`;

  return divisaElegida;
}

function configuracionGrafica(serie, codigoDivisa) {
  const ordenHistorial = [...serie].reverse();
  const acotarHistorial = ordenHistorial.slice(0, 10);

  const fechas = acotarHistorial.map((dato) => {
    const fecha = new Date(dato.fecha);
    return fecha.toLocaleDateString("es-CL");
  });

  const valores = ordenHistorial.map((dato) => dato.valor);

  const config = {
    type: "line",
    data: {
      labels: fechas,
      datasets: [
        {
          label: codigoDivisa,
          backgroundColor: "#00d4fa",
          borderColor: "#42bb32",
          data: valores,
        },
      ],
    },
  };
  return config;
}

async function renderGrafica(codigoDivisa) {
  const serie = await llamadoHistorial(codigoDivisa);
  const config = configuracionGrafica(serie, codigoDivisa);
  const chartDOM = document.getElementById("myChart");

  if (miGrafico) {
    miGrafico.destroy();
  }

  miGrafico = new Chart(chartDOM, config);
}

async function manejarClickConversion() {
  const codigoDivisa = await convertirDivisas();
  if (!codigoDivisa) return;
  renderGrafica(codigoDivisa);
}

btnConv.addEventListener("click", manejarClickConversion);
