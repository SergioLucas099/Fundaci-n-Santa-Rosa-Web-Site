import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


// =========================================
// REFERENCIA SOBRE NOSOTROS
// =========================================

const sobreNosotrosRef =
    ref(database, "Sobre_Nosotros");


onValue(sobreNosotrosRef, (snapshot) => {

    if (!snapshot.exists()) {

        console.log(
            "No existe información en Sobre_Nosotros"
        );

        return;
    }


    // =========================================
    // INTRODUCCIÓN
    // =========================================

    const introduccion =
        snapshot.child("Introduccion");


    const textoIntroduccion =
        introduccion
            .child("Texto")
            .val();


    const urlIntroduccion1 =
        introduccion
            .child("Url_1")
            .val();


    const urlIntroduccion2 =
        introduccion
            .child("Url_2")
            .val();


    // TEXTO

    const textoIntro =
        document.getElementById(
            "aboutIntro"
        );


    if (textoIntro) {

        textoIntro.textContent =
            textoIntroduccion || "";
    }


    // IMAGEN 1

    const imagenIntroduccion1 =
        document.getElementById(
            "imgIntroduccion1Firebase"
        );


    if (
        imagenIntroduccion1 &&
        urlIntroduccion1
    ) {

        imagenIntroduccion1.src =
            urlIntroduccion1;
    }


    // IMAGEN 2

    const imagenIntroduccion2 =
        document.getElementById(
            "imgIntroduccion2Firebase"
        );


    if (
        imagenIntroduccion2 &&
        urlIntroduccion2
    ) {

        imagenIntroduccion2.src =
            urlIntroduccion2;
    }


    // =========================================
    // MISIÓN
    // =========================================

    const mision =
        snapshot.child("Misión");


    const textoMision =
        mision
            .child("Texto")
            .val();


    const urlMision =
        mision
            .child("Url")
            .val();


    const elementoTextoMision =
        document.getElementById(
            "textoMisionFirebase"
        );


    const elementoImagenMision =
        document.getElementById(
            "imgMisionFirebase"
        );


    if (elementoTextoMision) {

        elementoTextoMision.textContent =
            textoMision || "";
    }


    if (
        elementoImagenMision &&
        urlMision
    ) {

        elementoImagenMision.src =
            urlMision;
    }


    // =========================================
    // VISIÓN
    // =========================================

    const vision =
        snapshot.child("Visión");


    const textoVision =
        vision
            .child("Texto")
            .val();


    const urlVision =
        vision
            .child("Url")
            .val();


    const elementoTextoVision =
        document.getElementById(
            "textoVisionFirebase"
        );


    const elementoImagenVision =
        document.getElementById(
            "imgVisionFirebase"
        );


    if (elementoTextoVision) {

        elementoTextoVision.textContent =
            textoVision || "";
    }


    if (
        elementoImagenVision &&
        urlVision
    ) {

        elementoImagenVision.src =
            urlVision;
    }


    // =========================================
    // FILOSOFÍA
    // =========================================

    const filosofia =
        snapshot.child("Filosofia");


    const textoFilosofia =
        filosofia
            .child("Texto")
            .val();


    const urlFilosofia =
        filosofia
            .child("Url")
            .val();


    const elementoTextoFilosofia =
        document.getElementById(
            "textoFilosofiaFirebase"
        );


    const elementoImagenFilosofia =
        document.getElementById(
            "imgFilosofiaFirebase"
        );


    if (elementoTextoFilosofia) {

        elementoTextoFilosofia.textContent =
            textoFilosofia || "";
    }


    if (
        elementoImagenFilosofia &&
        urlFilosofia
    ) {

        elementoImagenFilosofia.src =
            urlFilosofia;
    }


    // =========================================
    // ESMERALDAS SANTA ROSA
    // =========================================

    const esmeraldas =
        snapshot.child("Esmeraldas_WS");


    const textoEsmeraldas =
        esmeraldas
            .child("Texto")
            .val();


    const urlEsmeraldas =
        esmeraldas
            .child("Url")
            .val();


    const elementoTextoEsmeraldas =
        document.getElementById(
            "textoEsmeraldasFirebase"
        );


    const elementoImagenEsmeraldas =
        document.getElementById(
            "imgEsmeraldasFirebase"
        );


    if (elementoTextoEsmeraldas) {

        elementoTextoEsmeraldas.textContent =
            textoEsmeraldas || "";
    }


    if (
        elementoImagenEsmeraldas &&
        urlEsmeraldas
    ) {

        elementoImagenEsmeraldas.src =
            urlEsmeraldas;
    }

});