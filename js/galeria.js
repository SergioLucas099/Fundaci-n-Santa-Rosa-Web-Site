import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

import {
    database
} from "./firebase.js";


/* =========================================
   VARIABLES
   ========================================= */

let categorias = {};

let categoriaActual = null;

let imagenesActuales = [];

let indiceImagenActual = 0;


/* =========================================
   ELEMENTOS HTML
   ========================================= */

const contenedorCategorias =
    document.getElementById(
        "categoriasFirebase"
    );

const contenedorGaleria =
    document.getElementById(
        "galeriaFirebase"
    );


/* =========================================
   CARGAR FOTOGRAFÍAS
   ========================================= */

async function cargarGaleria() {

    try {

        const referencia =
            ref(
                database,
                "Fotografias"
            );

        const resultado =
            await get(
                referencia
            );


        if (!resultado.exists()) {

            console.warn(
                "No existen fotografías en Firebase."
            );

            return;
        }


        const datos =
            resultado.val();


        categorias = datos;


        crearBotonesCategorias();


        const primeraCategoria =
            Object.keys(categorias)[0];


        if (primeraCategoria) {

            mostrarCategoria(
                primeraCategoria
            );

        }


    } catch (error) {

        console.error(
            "Error al cargar la galería:",
            error
        );

    }

}


/* =========================================
   CREAR CATEGORÍAS
   ========================================= */

function crearBotonesCategorias() {

    contenedorCategorias.innerHTML =
        "";


    Object.entries(
        categorias
    ).forEach(
        ([id, categoria]) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "categoria-galeria";


            boton.textContent =
                categoria.Categoria ||
                "Sin nombre";


            boton.addEventListener(
                "click",
                () => {

                    mostrarCategoria(
                        id
                    );

                }
            );


            contenedorCategorias.appendChild(
                boton
            );

        }
    );

}


/* =========================================
   MOSTRAR CATEGORÍA
   ========================================= */

function mostrarCategoria(id) {

    categoriaActual = id;


    const categoria =
        categorias[id];


    if (!categoria) {
        return;
    }


    console.log(
        "Categoría seleccionada:",
        categoria
    );


    console.log(
        "Imágenes de la categoría:",
        categoria.Imagenes
    );


    imagenesActuales = [];


    if (
        categoria.Imagenes
    ) {

        Object.values(
            categoria.Imagenes
        ).forEach(
            (imagen) => {

                console.log(
                    "Imagen encontrada:",
                    imagen
                );


                if (
                    imagen.url
                ) {

                    imagenesActuales.push(
                        imagen.url
                    );

                }

            }
        );

    }


    console.log(
        "Lista final de imágenes:",
        imagenesActuales
    );


    actualizarCategoriaActiva();

    mostrarImagenes();

}


/* =========================================
   CATEGORÍA ACTIVA
   ========================================= */

function actualizarCategoriaActiva() {

    const botones =
        document.querySelectorAll(
            ".categoria-galeria"
        );


    botones.forEach(
        (boton, indice) => {

            const id =
                Object.keys(
                    categorias
                )[indice];


            if (
                id === categoriaActual
            ) {

                boton.classList.add(
                    "activa"
                );

            } else {

                boton.classList.remove(
                    "activa"
                );

            }

        }
    );

}


/* =========================================
   MOSTRAR IMÁGENES
   ========================================= */

function mostrarImagenes() {

    contenedorGaleria.innerHTML =
        "";


    imagenesActuales.forEach(
        (url, indice) => {

            const imagen =
                document.createElement(
                    "img"
                );


            imagen.src =
                url;


            imagen.className =
                "foto-galeria";


            imagen.alt =
                "Fotografía de Fundación Santa Rosa";


            imagen.addEventListener(
                "click",
                () => {

                    abrirModal(
                        indice
                    );

                }
            );


            contenedorGaleria.appendChild(
                imagen
            );

        }
    );

}


/* =========================================
   ABRIR MODAL
   ========================================= */

function abrirModal(indice) {

    indiceImagenActual =
        indice;


    const modal =
        document.createElement(
            "div"
        );


    modal.className =
        "galeria-modal";


    modal.innerHTML = `

        <button
            class="galeria-modal-cerrar"
            aria-label="Cerrar">
            ×
        </button>

        <button
            class="galeria-modal-anterior"
            aria-label="Anterior">
            ‹
        </button>

        <img
            class="galeria-modal-imagen"
            src="${imagenesActuales[indiceImagenActual]}"
            alt="Fotografía">

        <button
            class="galeria-modal-siguiente"
            aria-label="Siguiente">
            ›
        </button>

    `;


    document.body.appendChild(
        modal
    );


    const imagenModal =
        modal.querySelector(
            ".galeria-modal-imagen"
        );


    /* CERRAR */

    modal.querySelector(
        ".galeria-modal-cerrar"
    ).addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    /* ANTERIOR */

    modal.querySelector(
        ".galeria-modal-anterior"
    ).addEventListener(
        "click",
        () => {

            indiceImagenActual--;

            if (
                indiceImagenActual < 0
            ) {

                indiceImagenActual =
                    imagenesActuales.length - 1;

            }


            imagenModal.src =
                imagenesActuales[
                    indiceImagenActual
                ];

        }
    );


    /* SIGUIENTE */

    modal.querySelector(
        ".galeria-modal-siguiente"
    ).addEventListener(
        "click",
        () => {

            indiceImagenActual++;

            if (
                indiceImagenActual >=
                imagenesActuales.length
            ) {

                indiceImagenActual =
                    0;

            }


            imagenModal.src =
                imagenesActuales[
                    indiceImagenActual
                ];

        }
    );


    /* CERRAR HACIENDO CLIC EN EL FONDO */

    modal.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target === modal
            ) {

                modal.remove();

            }

        }
    );


    /* TECLADO */

    document.addEventListener(
        "keydown",
        manejarTeclado
    );


    function manejarTeclado(evento) {

        if (
            !document.body.contains(modal)
        ) {

            document.removeEventListener(
                "keydown",
                manejarTeclado
            );

            return;
        }


        if (
            evento.key === "Escape"
        ) {

            modal.remove();

        }


        if (
            evento.key === "ArrowLeft"
        ) {

            modal.querySelector(
                ".galeria-modal-anterior"
            ).click();

        }


        if (
            evento.key === "ArrowRight"
        ) {

            modal.querySelector(
                ".galeria-modal-siguiente"
            ).click();

        }

    }

}


/* =========================================
   INICIAR
   ========================================= */

if (
    contenedorCategorias &&
    contenedorGaleria
) {

    cargarGaleria();

}