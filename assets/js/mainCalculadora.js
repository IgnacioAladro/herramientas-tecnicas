function calcularConversion() {
    const CAPITAL = parseFloat(document.getElementById("capital").value);
    const DIVISA = document.getElementById("divisa").value;
    const TIPO_DE_CAMBIO = {
        eur: 847,
        usd: 805,
        cny: 110,
        btc: 9501396
    };

    if (isNaN(CAPITAL) || CAPITAL <= 0) {
        document.getElementById("resultado").innerHTML = "Ingrese un monto valido y mayor que cero.";
        return;
    }

    if (!isNaN(CAPITAL) && TIPO_DE_CAMBIO[DIVISA]) {
        const RESULTADO = (CAPITAL / TIPO_DE_CAMBIO[DIVISA]).toFixed(DIVISA === "btc" ? 8 : 2);
        document.getElementById("resultado").innerHTML = `${CAPITAL} ARS = ${RESULTADO} ${DIVISA}`;

        const CONVERSION = {
            tuDinero: CAPITAL,
            monedaQueElegiste: DIVISA,
            resultado: RESULTADO
        };
        
        historial.push(CONVERSION);
        localStorage.setItem("historial", JSON.stringify(historial));
        actualizarHistorial(historial);
        
    } else {
        document.getElementById("resultado").innerHTML = "Debe ingresar un monto valido";
    }
};

function actualizarHistorial(datos) {
    const NUEVO_HISTORIAL = document.getElementById("historial").getElementsByTagName('tbody')[0];
    
    while (NUEVO_HISTORIAL.firstChild) {
        NUEVO_HISTORIAL.removeChild(NUEVO_HISTORIAL.firstChild);
    }

    for (let i = datos.length - 1; i >= 0; i--) {
        const conversion = datos[i];
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${conversion.tuDinero} ARS</td>
            <td>${conversion.monedaQueElegiste}</td>
            <td>${conversion.resultado}</td>`;
        NUEVO_HISTORIAL.appendChild(row);
    };
};

let historial = JSON.parse(localStorage.getItem("historial")) || [];

const BOTON_CALCULAR = document.getElementById("botonCalcular");
BOTON_CALCULAR.addEventListener("click", calcularConversion);

if (historial) {
    historial = JSON.parse(localStorage.getItem("historial"));
    actualizarHistorial(historial);
} else {
    historial = [];
}; 

const BOTON_BORRAR_HISTORIAL = document.getElementById("borrarHistorial");
BOTON_BORRAR_HISTORIAL.addEventListener("click", function () {
    historial = [];
    localStorage.setItem("historial", JSON.stringify(historial));
    actualizarHistorial(historial);
});