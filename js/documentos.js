import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const listaDocumentos = document.getElementById("listaDocumentos");

const documentosRef = ref(database, "Documentos");


onValue(documentosRef, (snapshot) => {

    listaDocumentos.innerHTML = "";

    if (!snapshot.exists()) {

        const mensaje = document.createElement("span");

        mensaje.textContent = "No hay documentos disponibles.";

        listaDocumentos.appendChild(mensaje);

        return;
    }

    snapshot.forEach((documento) => {

        const datos = documento.val();

        const enlace = document.createElement("a");

        enlace.href = datos.Url;

        enlace.target = "_blank";

        enlace.rel = "noopener noreferrer";

        enlace.textContent = datos.Nombre;

        listaDocumentos.appendChild(enlace);

    });

});