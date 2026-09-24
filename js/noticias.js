import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const contenedorNoticias = document.getElementById("noticiasFirebase");


const noticiasRef = ref(database, "Noticias");


onValue(noticiasRef, (snapshot) => {

    console.log("Noticias obtenidas desde Firebase:");

    const datos = snapshot.val();

    console.log(datos);


    // Verificar si existen noticias
    if (!datos) {

        console.log("No hay noticias disponibles.");

        return;
    }


    // Convertir las noticias en un arreglo
    const noticias = Object.values(datos);


    console.log("Cantidad de noticias:", noticias.length);


    // Ordenar de la más reciente a la más antigua
    noticias.sort((a, b) => {

        return convertirFecha(b.Fecha) - convertirFecha(a.Fecha);

    });


    console.log("Noticias ordenadas:", noticias);


    // Tomar únicamente las 4 más recientes
    const noticiasRecientes = noticias.slice(0, 4);


    console.log("4 noticias más recientes:", noticiasRecientes);


    // Limpiar el contenedor
    contenedorNoticias.innerHTML = "";


    // Crear las tarjetas
    noticiasRecientes.forEach((noticia) => {

        crearTarjetaNoticia(noticia);

    });

});


function crearTarjetaNoticia(noticia) {

    const tarjeta = document.createElement("article");

    tarjeta.classList.add("noticia-card");


    tarjeta.innerHTML = `

        <img
            src="${noticia.Portada}"
            alt="${noticia.Encabezado || "Noticia"}"
            class="noticia-portada"
        >


        <div class="noticia-contenido">

            <h3 class="noticia-encabezado">

                ${noticia.Encabezado || "Sin título"}

            </h3>


            <div class="noticia-fecha">

                ${noticia.Fecha || ""}

            </div>


            <a
                href="#"
                class="noticia-leer-mas"
                data-id="${noticia.Id}"
            >

                Leer más

                <span>→</span>

            </a>

        </div>

    `;


    contenedorNoticias.appendChild(tarjeta);

}


function convertirFecha(fechaTexto) {

    if (!fechaTexto) {
        return 0;
    }


    try {

        const partes = fechaTexto.split(" ");

        const fecha = partes[0];

        const hora = partes[1];

        const periodo = partes[2].toLowerCase();


        const [dia, mes, anio] = fecha.split("/");


        let [horas, minutos] = hora.split(":");

        horas = parseInt(horas);

        minutos = parseInt(minutos);


        // Convertir PM a formato de 24 horas
        if (periodo.includes("p") && horas !== 12) {

            horas += 12;

        }


        // Convertir 12 AM a 00
        if (periodo.includes("a") && horas === 12) {

            horas = 0;

        }


        return new Date(
            parseInt(anio),
            parseInt(mes) - 1,
            parseInt(dia),
            horas,
            minutos
        ).getTime();


    } catch (error) {

        console.error(
            "Error al convertir la fecha:",
            fechaTexto
        );

        return 0;
    }

}

contenedorNoticias.addEventListener("click", (event) => {

    const enlace = event.target.closest(".noticia-leer-mas");

    if (!enlace) { 
        return; 
    }

    event.preventDefault();

    const idNoticia = enlace.dataset.id;

    if (!idNoticia) {

        console.error("No se encontró el Id de la noticia.");

        return;

    }

    console.log("Noticia seleccionada:", idNoticia);

    window.location.href =
    `ventanas/noticia_completa.html?id=${encodeURIComponent(idNoticia)}`;

});