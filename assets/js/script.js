const montoInput = document.querySelector("#monto")
const divisaSelected = document.querySelector("#divisas")
const btnConv = document.querySelector("#btn-conversion")
const montoConvertido = document.querySelector("#resultado-conversion")


async function llamadoDivisas() {
    try {
        const res = await fetch("https://mindicador.cl/api/");
        const divisas = await res.json();
        return divisas
    } catch (error) {
        alert(error.message)
    }
}
async function convertirDivisas(){
    const monto = Number(montoInput.value);
    const divisaElegida = divisaSelected.value;

    if (monto <= 0){
        alert('Ingresa un monto válido mayor a 0')
        return;
    }

   const divisas = await llamadoDivisas();

    let conversion = monto * divisas[divisaElegida].valor;
    montoConvertido.textContent = `Son: ${conversion.toFixed(2)} CLP`
}

btnConv.addEventListener('click', convertirDivisas);