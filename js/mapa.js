import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

import {
    database
} from "./firebase.js";


let mapa;


/* =========================================
   ESPERAR A GOOGLE MAPS
   ========================================= */

window.addEventListener(
    "googleMapsReady",
    () => {

        console.log(
            "Google Maps está listo."
        );

        crearMapa();

    }
);


/* =========================================
   CREAR MAPA
   ========================================= */

function crearMapa() {

    console.log(
        "Intentando crear el mapa..."
    );


    const contenedor =
        document.getElementById(
            "mapaFirebase"
        );


    if (!contenedor) {

        console.error(
            "No existe #mapaFirebase"
        );

        return;
    }


    const ubicacionInicial = {

        lat: 5.6182733,

        lng: -73.8167476

    };


    mapa =
        new google.maps.Map(
            contenedor,
            {

                center:
                    ubicacionInicial,

                zoom: 9,

                mapTypeControl:
                    false,

                streetViewControl:
                    false,

                fullscreenControl:
                    true

            }
        );


    console.log(
        "Mapa creado correctamente."
    );


    cargarSedes();

}


/* =========================================
   CARGAR SEDES DESDE FIREBASE
   ========================================= */

async function cargarSedes() {

    console.log(
        "Consultando Mapa en Firebase..."
    );


    try {

        const referenciaMapa =
            ref(
                database,
                "Mapa"
            );


        const resultado =
            await get(
                referenciaMapa
            );


        console.log(
            "Resultado Firebase:",
            resultado
        );


        if (!resultado.exists()) {

            console.warn(
                "El nodo Mapa está vacío."
            );

            return;
        }


        const sedes =
            resultado.val();


        console.log(
            "Sedes obtenidas desde Firebase:",
            sedes
        );


        Object.entries(
            sedes
        ).forEach(
            ([municipio, datos]) => {


                console.log(
                    "Procesando sede:",
                    municipio,
                    datos
                );


                const latitud =
                    Number(
                        datos.latitudMapa
                    );


                const longitud =
                    Number(
                        datos.longitudMapa
                    );


                console.log(
                    "Coordenadas:",
                    latitud,
                    longitud
                );


                if (
                    isNaN(latitud) ||
                    isNaN(longitud)
                ) {

                    console.warn(
                        "Coordenadas inválidas para:",
                        municipio
                    );

                    return;
                }


                const marcador =
                    new google.maps.Marker({

                        position: {

                            lat: latitud,

                            lng: longitud

                        },

                        map: mapa,

                        title:
                            datos.NombreSitio ||
                            municipio

                    });


                const ventana =
                    new google.maps.InfoWindow({

                        content: `

                            <div class="info-sede">

                                <img
                                    src="${datos.urlImagenMapa || "images/logo.png"}"
                                    alt="${datos.NombreSitio || municipio}"
                                    class="info-sede-imagen"
                                >

                                <div class="info-sede-contenido">

                                    <h3>
                                        ${datos.NombreSitio || municipio}
                                    </h3>

                                    <p>
                                        <strong>📍 Dirección:</strong>
                                        ${datos.DireccionSitio || "No disponible"}
                                    </p>

                                    <p>
                                        <strong>📞 Teléfono:</strong>
                                        ${datos.TelefonoSitio || "No disponible"}
                                    </p>

                                    <p>
                                        <strong>🧧 Correo:</strong>
                                        ${datos.CorreoMapa || "No disponible"}
                                    </p>

                                </div>

                            </div>

                        `

                    });


                marcador.addListener(
                    "click",
                    () => {

                        ventana.open({

                            anchor:
                                marcador,

                            map:
                                mapa

                        });

                    }
                );

            }
        );


    } catch (error) {

        console.error(
            "Error al consultar Firebase:",
            error
        );

    }

}