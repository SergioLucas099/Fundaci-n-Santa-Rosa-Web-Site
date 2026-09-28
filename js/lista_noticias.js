import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


// =========================================
// CONTENEDOR
// =========================================

const contenedorNoticias =
    document.getElementById("todasLasNoticias");


// =========================================
// REFERENCIA FIREBASE
// =========================================

const noticiasRef =
    ref(database, "Noticias");


// =========================================
// OBTENER TODAS LAS NOTICIAS
// =========================================

onValue(noticiasRef, (snapshot) => {

    console.log("Todas las noticias obtenidas:");

    const datos = snapshot.val();


    // -------------------------------------
    // VERIFICAR SI EXISTEN NOTICIAS
    // -------------------------------------

    if (!datos) {

        console.log(
            "No hay noticias disponibles."
        );

        contenedorNoticias.innerHTML = `

            <div class="sin-noticias">

                <i class="uil uil-newspaper"></i>

                <h3>
                    No hay noticias disponibles
                </h3>

                <p>
                    Actualmente no hay noticias
                    publicadas.
                </p>

            </div>

        `;

        return;

    }


    // -------------------------------------
    // CONVERTIR A ARREGLO
    // -------------------------------------

    const noticias =
        Object.values(datos);


    console.log(
        "Cantidad de noticias:",
        noticias.length
    );


    // -------------------------------------
    // ORDENAR POR FECHA
    // -------------------------------------

    noticias.sort((a, b) => {

        return (
            convertirFecha(b.Fecha) -
            convertirFecha(a.Fecha)
        );

    });


    console.log(
        "Noticias ordenadas:",
        noticias
    );


    // -------------------------------------
    // LIMPIAR CONTENEDOR
    // -------------------------------------

    contenedorNoticias.innerHTML = "";


    // -------------------------------------
    // CREAR TODAS LAS TARJETAS
    // -------------------------------------

    noticias.forEach((noticia) => {

        crearTarjetaNoticia(noticia);

    });

});


// =========================================
// CREAR TARJETA
// =========================================

function crearTarjetaNoticia(noticia) {

    const tarjeta =
        document.createElement("article");


    tarjeta.classList.add(
        "lista-noticia-card"
    );


    tarjeta.innerHTML = `

        <img
            src="${noticia.Portada || ""}"
            alt="${noticia.Encabezado || "Noticia"}"
            class="lista-noticia-portada"
        >


        <div class="lista-noticia-contenido">


            <h3 class="lista-noticia-encabezado">

                ${noticia.Encabezado || "Sin título"}

            </h3>


            <div class="lista-noticia-fecha">

                <i class="uil uil-clock"></i>

                <span>

                    ${noticia.Fecha || ""}

                </span>

            </div>


            <a
                href="#"
                class="lista-noticia-leer-mas"
                data-id="${noticia.Id}"
            >

                Leer más

                <span>→</span>

            </a>


        </div>

    `;


    contenedorNoticias.appendChild(
        tarjeta
    );

}


// =========================================
// SELECCIONAR NOTICIA
// =========================================

contenedorNoticias.addEventListener(
    "click",
    (event) => {


        const enlace =
            event.target.closest(
                ".lista-noticia-leer-mas"
            );


        if (!enlace) {

            return;

        }


        event.preventDefault();


        const idNoticia =
            enlace.dataset.id;


        if (!idNoticia) {

            console.error(
                "No se encontró el Id de la noticia."
            );

            return;

        }


        console.log(
            "Noticia seleccionada:",
            idNoticia
        );


        window.location.href =
            `noticia_completa.html?id=${encodeURIComponent(idNoticia)}`;

    }
);


// =========================================
// CONVERTIR FECHA
// =========================================

function convertirFecha(fechaTexto) {

    if (!fechaTexto) {

        return 0;

    }


    try {

        const partes =
            fechaTexto.split(" ");


        const fecha =
            partes[0];


        const hora =
            partes[1];


        const periodo =
            partes[2].toLowerCase();


        const [dia, mes, anio] =
            fecha.split("/");


        let [horas, minutos] =
            hora.split(":");


        horas =
            parseInt(horas);


        minutos =
            parseInt(minutos);


        // PM

        if (
            periodo.includes("p") &&
            horas !== 12
        ) {

            horas += 12;

        }


        // 12 AM

        if (
            periodo.includes("a") &&
            horas === 12
        ) {

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