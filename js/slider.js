import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const sliderFirebase =
    document.getElementById("sliderFirebase");

const sliderThumbsFirebase =
    document.getElementById("sliderThumbsFirebase");


const imagesSliderRef =
    ref(database, "Images_Slider");


onValue(imagesSliderRef, (snapshot) => {

    // Limpiar slider principal
    sliderFirebase.innerHTML = "";

    // Limpiar miniaturas
    sliderThumbsFirebase.innerHTML = "";


    if (!snapshot.exists()) {

        console.log(
            "No hay imágenes disponibles en Images_Slider"
        );

        return;
    }


    snapshot.forEach((slider) => {

        const datos = slider.val();

        // SLIDE PRINCIPAL

        const slide =
            document.createElement("div");

        slide.classList.add(
            "swiper-slide",
            "dark-layer"
        );


        slide.innerHTML = `

            <img
                src="${datos.Url}"
                alt="${datos.Encabezado}"
            >

            <div class="text-content">

                <span class="subtitle">
                    ${datos.Encabezado}
                </span>

                <br><br>

                <h2 class="title">
                    ${datos.Contenido}
                </h2>

            </div>

        `;


        sliderFirebase.appendChild(slide);

        // MINIATURA

        const miniatura =
            document.createElement("img");

        miniatura.src =
            datos.Url;

        miniatura.alt =
            datos.Encabezado;

        miniatura.classList.add(
            "swiper-slide"
        );


        sliderThumbsFirebase.appendChild(
            miniatura
        );

    });

    // INICIAR SWIPER
    if (typeof window.iniciarSwiper === "function") {

        window.iniciarSwiper();

    }

});