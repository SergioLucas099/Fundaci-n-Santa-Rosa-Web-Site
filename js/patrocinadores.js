import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

import {
    database
} from "./firebase.js";


// =========================================
// VARIABLES DEL SLIDER
// =========================================

let posicionActual = 0;

let cantidadPatrocinadores = 0;

let intervaloSlider = null;

let moviendo = false;


// =========================================
// REFERENCIA A FIREBASE
// =========================================

const patrocinadoresRef = ref(
    database,
    "Patrocinadores"
);


// =========================================
// CARGAR PATROCINADORES
// =========================================

onValue(patrocinadoresRef, (snapshot) => {

    const track = document.getElementById(
        "patrocinadoresTrack"
    );


    if (!track) {

        console.error(
            "No se encontró #patrocinadoresTrack"
        );

        return;
    }


    // Detener animación anterior

    detenerSlider();


    // Limpiar contenido

    track.innerHTML = "";


    // =========================================
    // CREAR PATROCINADORES
    // =========================================

    snapshot.forEach((patrocinadorSnapshot) => {

        const datos = patrocinadorSnapshot.val();


        if (!datos.Url) {
            return;
        }


        const contenedor = document.createElement(
            "div"
        );

        contenedor.classList.add(
            "patrocinador"
        );


        const imagen = document.createElement(
            "img"
        );

        imagen.src = datos.Url;

        imagen.alt = "Patrocinador";


        contenedor.appendChild(imagen);

        track.appendChild(contenedor);

    });


    cantidadPatrocinadores =
        track.children.length;


    console.log(
        "Patrocinadores cargados:",
        cantidadPatrocinadores
    );


    // =========================================
    // SI NO HAY PATROCINADORES
    // =========================================

    if (cantidadPatrocinadores === 0) {
        return;
    }


    // =========================================
    // DUPLICAR LOS PATROCINADORES
    // =========================================

    const patrocinadoresOriginales =
        Array.from(track.children);


    patrocinadoresOriginales.forEach(
        (patrocinador) => {

            const clon =
                patrocinador.cloneNode(true);

            track.appendChild(clon);

        }
    );


    // =========================================
    // INICIAR SLIDER
    // =========================================

    posicionActual = 0;

    track.style.transform =
        "translateX(0)";


    iniciarSlider();

});


// =========================================
// INICIAR SLIDER
// =========================================

function iniciarSlider() {

    detenerSlider();


    intervaloSlider = setInterval(() => {

        moverSlider();

    }, 3800);

}


// =========================================
// MOVER SLIDER
// =========================================

function moverSlider() {

    if (moviendo) {
        return;
    }


    const track =
        document.getElementById(
            "patrocinadoresTrack"
        );


    if (!track) {
        return;
    }


    const patrocinador =
        track.querySelector(
            ".patrocinador"
        );


    if (!patrocinador) {
        return;
    }


    const ancho =
        patrocinador.offsetWidth;


    posicionActual++;


    moviendo = true;


    track.style.transition =
        "transform 0.8s ease";


    track.style.transform =
        `translateX(-${posicionActual * ancho}px)`;


    // =========================================
    // LLEGAMOS AL PRIMER CLON
    // =========================================

    if (
        posicionActual ===
        cantidadPatrocinadores
    ) {

        setTimeout(() => {

            track.style.transition =
                "none";


            posicionActual = 0;


            track.style.transform =
                "translateX(0)";


            // Forzar actualización del navegador

            track.offsetHeight;


            moviendo = false;

        }, 800);

    } else {

        setTimeout(() => {

            moviendo = false;

        }, 800);

    }

}


// =========================================
// DETENER SLIDER
// =========================================

function detenerSlider() {

    if (intervaloSlider !== null) {

        clearInterval(
            intervaloSlider
        );

        intervaloSlider = null;

    }

}