
import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

import {
    database
} from "./firebase.js";


// =========================================
// ELEMENTOS HTML
// =========================================

const track = document.getElementById("patrocinadoresTrack");

const viewport = document.getElementById("patrocinadoresViewport");

const btnAnterior = document.getElementById("patrocinadorAnterior");

const btnSiguiente = document.getElementById("patrocinadorSiguiente");

const lightbox = document.getElementById("patrocinadorLightbox");

const imagenLightbox = document.getElementById("imagenLightbox");

const cerrarLightbox = document.getElementById("cerrarLightbox");


// =========================================
// VALIDAR ELEMENTOS
// =========================================

if (
    !track ||
    !viewport ||
    !btnAnterior ||
    !btnSiguiente ||
    !lightbox ||
    !imagenLightbox ||
    !cerrarLightbox
) {
    console.error(
        "No se encontraron todos los elementos de patrocinadores."
    );

    throw new Error("Error al inicializar el slider de patrocinadores.");
}


// =========================================
// VARIABLES DEL SLIDER
// =========================================

let posicionActual = 0;

let cantidadPatrocinadores = 0;

let intervaloSlider = null;

let moviendo = false;

let pausaUsuario = false;

let punteroDentro = false;

let imagenAbierta = false;

let inicioToqueX = 0;

let desplazamientoTactil = false;

let temporizadorReanudacion = null;

const TIEMPO_SLIDER = 3800;

const DURACION_TRANSICION = 800;

const DISTANCIA_DESLIZAMIENTO = 40;


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

    detenerSlider();

    track.innerHTML = "";

    posicionActual = 0;

    cantidadPatrocinadores = 0;

    moviendo = false;


    // Limpiar estado anterior

    track.style.transition = "none";

    track.style.transform = "translateX(0)";


    // =========================================
    // OBTENER DATOS DE FIREBASE
    // =========================================

    const patrocinadores = [];

    snapshot.forEach((patrocinadorSnapshot) => {

        const datos = patrocinadorSnapshot.val();

        if (!datos || !datos.Url) {
            return;
        }

        patrocinadores.push(datos.Url);

    });


    cantidadPatrocinadores = patrocinadores.length;


    console.log(
        "Patrocinadores cargados:",
        cantidadPatrocinadores
    );


    // =========================================
    // VALIDAR SI EXISTEN PATROCINADORES
    // =========================================

    if (cantidadPatrocinadores === 0) {

        btnAnterior.style.display = "none";

        btnSiguiente.style.display = "none";

        return;

    }


    // =========================================
    // CREAR ELEMENTOS
    // =========================================

    function crearPatrocinador(url) {

        const contenedor = document.createElement("div");

        contenedor.classList.add("patrocinador");


        const imagen = document.createElement("img");

        imagen.src = url;

        imagen.alt = "Patrocinador";

        imagen.loading = "lazy";


        contenedor.appendChild(imagen);

        return contenedor;

    }


    // =========================================
    // CREAR CLONES AL INICIO
    // =========================================

    patrocinadores.forEach((url) => {

        track.appendChild(
            crearPatrocinador(url)
        );

    });


    // =========================================
    // AGREGAR ELEMENTOS ORIGINALES
    // =========================================

    patrocinadores.forEach((url) => {

        track.appendChild(
            crearPatrocinador(url)
        );

    });


    // =========================================
    // CREAR CLONES AL FINAL
    // =========================================

    patrocinadores.forEach((url) => {

        track.appendChild(
            crearPatrocinador(url)
        );

    });


    // =========================================
    // CONFIGURAR POSICIÓN INICIAL
    // =========================================

    posicionActual = cantidadPatrocinadores;


    // Mostrar controles si hay varios patrocinadores

    const mostrarControles = cantidadPatrocinadores > 1;

    btnAnterior.style.display =
        mostrarControles ? "flex" : "none";

    btnSiguiente.style.display =
        mostrarControles ? "flex" : "none";


    // Esperar al cálculo del diseño

    requestAnimationFrame(() => {

        actualizarPosicion();

        if (mostrarControles) {

            iniciarSlider();

        }

    });

});


// =========================================
// CALCULAR POSICIÓN
// =========================================

function actualizarPosicion() {

    const elemento = track.children[posicionActual];

    if (!elemento) return;


    // Distancia real entre el primer elemento
    // del track y el elemento seleccionado

    const distancia =
        elemento.getBoundingClientRect().left -
        track.getBoundingClientRect().left;


    track.style.transform =
        `translateX(-${distancia}px)`;

}


// =========================================
// MOVER SLIDER
// =========================================

function moverSlider(direccion) {

    if (
        moviendo ||
        cantidadPatrocinadores <= 1
    ) {
        return;
    }


    moviendo = true;

    posicionActual += direccion;


    track.style.transition =
        `transform ${DURACION_TRANSICION / 1000}s ease`;


    actualizarPosicion();

}


// =========================================
// FINALIZAR TRANSICIÓN
// =========================================

track.addEventListener("transitionend", (event) => {

    if (event.propertyName !== "transform") {
        return;
    }


    // Llegamos al primer clon del final

    if (
        posicionActual >= cantidadPatrocinadores * 2
    ) {

        posicionActual = cantidadPatrocinadores;

    }


    // Llegamos al último clon del inicio

    else if (
        posicionActual < cantidadPatrocinadores
    ) {

        posicionActual =
            cantidadPatrocinadores * 2 - 1;

    }


    // Reposicionar sin animación

    track.style.transition = "none";

    actualizarPosicion();


    moviendo = false;

});


// =========================================
// INICIAR SLIDER AUTOMÁTICO
// =========================================

function iniciarSlider() {

    detenerSlider();


    if (
        cantidadPatrocinadores <= 1 ||
        pausaUsuario ||
        punteroDentro ||
        imagenAbierta
    ) {
        return;
    }


    intervaloSlider = setInterval(() => {

        moverSlider(1);

    }, TIEMPO_SLIDER);

}


// =========================================
// DETENER SLIDER
// =========================================

function detenerSlider() {

    if (intervaloSlider !== null) {

        clearInterval(intervaloSlider);

        intervaloSlider = null;

    }

}


// =========================================
// PAUSA TEMPORAL
// =========================================

function pausarTemporalmente() {

    detenerSlider();

    pausaUsuario = true;


    clearTimeout(temporizadorReanudacion);


    temporizadorReanudacion = setTimeout(() => {

        pausaUsuario = false;

        iniciarSlider();

    }, 5000);

}


// =========================================
// BOTÓN ANTERIOR
// =========================================

btnAnterior.addEventListener("click", () => {

    pausarTemporalmente();

    moverSlider(-1);

});


// =========================================
// BOTÓN SIGUIENTE
// =========================================

btnSiguiente.addEventListener("click", () => {

    pausarTemporalmente();

    moverSlider(1);

});


// =========================================
// PAUSA AL PASAR EL CURSOR
// =========================================

viewport.addEventListener("mouseenter", () => {

    punteroDentro = true;

    detenerSlider();

});


viewport.addEventListener("mouseleave", () => {

    punteroDentro = false;

    iniciarSlider();

});


// =========================================
// DESPLAZAMIENTO TÁCTIL
// =========================================

viewport.addEventListener("pointerdown", (event) => {

    if (event.pointerType !== "touch") {
        return;
    }

    inicioToqueX = event.clientX;

    desplazamientoTactil = false;

});


viewport.addEventListener("pointerup", (event) => {

    if (event.pointerType !== "touch") {
        return;
    }


    const diferencia =
        inicioToqueX - event.clientX;


    if (
        Math.abs(diferencia) <
        DISTANCIA_DESLIZAMIENTO
    ) {
        return;
    }


    desplazamientoTactil = true;

    pausarTemporalmente();


    if (diferencia > 0) {

        moverSlider(1);

    } else {

        moverSlider(-1);

    }


    // Evitar que el gesto abra el Lightbox

    setTimeout(() => {

        desplazamientoTactil = false;

    }, 400);

});


// =========================================
// ABRIR IMAGEN AMPLIADA
// =========================================

track.addEventListener("click", (event) => {

    if (desplazamientoTactil) {
        return;
    }


    const imagen = event.target.closest("img");

    if (!imagen) {
        return;
    }


    detenerSlider();

    pausaUsuario = true;

    imagenAbierta = true;


    imagenLightbox.src = imagen.src;

    imagenLightbox.alt = imagen.alt;


    lightbox.classList.add("activo");

    document.body.style.overflow = "hidden";

});


// =========================================
// CERRAR IMAGEN AMPLIADA
// =========================================

function cerrarImagen() {

    if (!imagenAbierta) {
        return;
    }


    lightbox.classList.remove("activo");


    imagenLightbox.src = "";

    imagenLightbox.alt = "";


    document.body.style.overflow = "";


    imagenAbierta = false;


    pausarTemporalmente();

}


// =========================================
// BOTÓN CERRAR
// =========================================

cerrarLightbox.addEventListener("click", cerrarImagen);


// =========================================
// CERRAR AL HACER CLIC FUERA
// =========================================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        cerrarImagen();

    }

});


// =========================================
// CERRAR CON TECLA ESCAPE
// =========================================

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        imagenAbierta
    ) {

        cerrarImagen();

    }

});


// =========================================
// LIMPIAR TEMPORIZADORES AL SALIR
// =========================================

window.addEventListener("pagehide", () => {

    detenerSlider();

    clearTimeout(temporizadorReanudacion);

});