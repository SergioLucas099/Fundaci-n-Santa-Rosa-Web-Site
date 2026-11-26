import { database } from "./firebase.js";

import {
    ref,
    onValue,
    runTransaction
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


// ======================================
// REFERENCIAS HTML
// ======================================

const numeroBeneficiarios =
    document.getElementById("numeroBeneficiarios");

const municipiosBeneficiados =
    document.getElementById("municipiosBeneficiados");

const contadorVisitas =
    document.getElementById("contadorVisitas");


// ======================================
// FORMATO DE NUMEROS
// ======================================

function formatearNumero(numero) {

    return Number(numero || 0).toLocaleString("es-CO");

}


// ======================================
// OBTENER ESTADISTICAS DE FIREBASE
// ======================================

const estadisticasRef = ref(database, "Estadisticas");

onValue(estadisticasRef, (snapshot) => {

    const datos = snapshot.val();

    if (!datos) return;


    // Numero de beneficiarios

    numeroBeneficiarios.textContent =
        formatearNumero(datos.numero_beneficiarios);


    // Municipios beneficiados

    municipiosBeneficiados.textContent =
        formatearNumero(datos.municipios_beneficiados);


    // Visitas

    contadorVisitas.textContent =
        formatearNumero(datos.visitas);

}, (error) => {

    console.error("Error al obtener estadísticas:", error);

});


// ======================================
// INCREMENTAR CONTADOR DE VISITAS
// ======================================

const visitasRef = ref(database, "Estadisticas/visitas");

runTransaction(visitasRef, (visitasActuales) => {

    return (visitasActuales || 0) + 1;

}).then((resultado) => {

    if (resultado.committed) {

        console.log(
            "Visita registrada:",
            resultado.snapshot.val()
        );

    }

}).catch((error) => {

    console.error(
        "Error al registrar la visita:",
        error
    );

});
