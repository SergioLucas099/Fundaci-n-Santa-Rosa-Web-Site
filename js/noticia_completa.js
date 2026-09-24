import { database } from "./firebase.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


// =========================================
// OBTENER EL ID DESDE LA URL
// =========================================

const parametros = new URLSearchParams(window.location.search);

const idNoticia = parametros.get("id");


console.log("Id de la noticia:", idNoticia);


// =========================================
// VERIFICAR SI EXISTE EL ID
// =========================================

if (!idNoticia) {

    console.error("No se recibió el Id de la noticia.");

    mostrarError("No se pudo identificar la noticia.");

} else {

    cargarNoticia(idNoticia);

}


// =========================================
// CARGAR NOTICIA DESDE FIREBASE
// =========================================

async function cargarNoticia(id) {

    try {

        console.log("Buscando noticia en Firebase...");


        // Referencia directa a la noticia
        const noticiaRef = ref(
            database,
            `Noticias/${id}`
        );


        // Obtener información
        const snapshot = await get(noticiaRef);


        // Verificar si existe
        if (!snapshot.exists()) {

            console.error("La noticia no existe.");

            mostrarError("La noticia que buscas no existe.");

            return;

        }


        // Obtener datos
        const noticia = snapshot.val();


        console.log("Noticia obtenida:", noticia);


        // Mostrar información
        mostrarNoticia(noticia);


    } catch (error) {

        console.error(
            "Error al obtener la noticia:",
            error
        );


        mostrarError(
            "Ocurrió un error al cargar la noticia."
        );

    }

}


// =========================================
// MOSTRAR NOTICIA
// =========================================

function mostrarNoticia(noticia) {

    // -------------------------------------
    // TÍTULO
    // -------------------------------------

    const titulo = document.getElementById(
        "tituloNoticia"
    );


    if (titulo) {

        titulo.textContent =
            noticia.Encabezado || "Sin título";

    }


    // -------------------------------------
    // PORTADA
    // -------------------------------------

    const portada = document.getElementById(
        "portadaNoticia"
    );


    if (portada && noticia.Portada) {

        portada.innerHTML = `

            <img
                src="${noticia.Portada}"
                alt="${noticia.Encabezado || "Noticia"}"
                class="noticia-portada-imagen">
        `;

    }


    // -------------------------------------
    // FECHA
    // -------------------------------------

    const fecha = document.getElementById(
        "fechaNoticia"
    );


    if (fecha) {

        fecha.textContent =
            noticia.Fecha || "";

    }


    // -------------------------------------
    // AUTOR
    // -------------------------------------

    const autor = document.getElementById(
        "autorNoticia"
    );


    if (autor) {

        autor.textContent =
            noticia.Autor || "";

    }


    // -------------------------------------
    // CONTENIDO
    // -------------------------------------

    const contenido = document.getElementById(
        "contenidoNoticia"
    );


    if (contenido) {

        contenido.textContent =
            noticia.Contenido || "";

    }


    // -------------------------------------
    // FOTOGRAFÍAS
    // -------------------------------------

    mostrarImagenes(noticia.Fotos);


    // -------------------------------------
    // VIDEO
    // -------------------------------------

    mostrarVideo(noticia.Video);

}


// =========================================
// MOSTRAR LAS FOTOGRAFÍAS
// =========================================

function mostrarImagenes(fotos) {

    const contenedor = document.getElementById(
        "imagenesNoticia"
    );


    if (!contenedor) {

        return;

    }


    // Limpiar contenedor
    contenedor.innerHTML = "";


    // Si no existen fotografías
    if (!fotos) {

        return;

    }


    // Recorrer las imágenes
    Object.entries(fotos).forEach(
        ([nombre, url]) => {

            // Verificar que exista una URL válida
            if (!url) {

                return;

            }


            const imagen = document.createElement(
                "img"
            );


            imagen.src = url;

            imagen.alt = nombre;

            imagen.classList.add(
                "imagen-noticia"
            );


            contenedor.appendChild(imagen);

        }
    );

}


// =========================================
// MOSTRAR VIDEO
// =========================================

function mostrarVideo(video) {

    const contenedor = document.getElementById(
        "videoNoticia"
    );


    if (!contenedor) {

        return;

    }


    // Limpiar contenedor
    contenedor.innerHTML = "";


    // Si no existe video
    if (!video) {

        return;

    }


    // Crear reproductor
    const videoElement =
        document.createElement("video");


    videoElement.src = video;

    videoElement.controls = true;

    videoElement.classList.add(
        "video-noticia"
    );


    contenedor.appendChild(videoElement);

}


// =========================================
// MOSTRAR ERROR
// =========================================

function mostrarError(mensaje) {

    const contenedor =
        document.querySelector(
            ".noticia-completa-contenedor"
        );


    if (!contenedor) {

        return;

    }


    contenedor.innerHTML = `

        <div class="noticia-error">

            <h2>
                ${mensaje}
            </h2>

        </div>

    `;

}