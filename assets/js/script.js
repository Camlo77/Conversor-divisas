async function convertirDivisa() {
    try {
        const res = await fetch("https://mindicador.cl/api/");
        const divisas = await res.json();
        return divisas
    } catch (error) {
        alert(e.message)
    }
}

