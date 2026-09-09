import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


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
        snapshot
            .child("Introduccion")
            .val();


    const aboutIntro =
        document.getElementById("aboutIntro");


    if (introduccion) {

        aboutIntro.textContent =
            introduccion;
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


    document.getElementById(
        "textoMisionFirebase"
    ).textContent =
        textoMision || "";


    if (urlMision) {

        document.getElementById(
            "imgMisionFirebase"
        ).src =
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


    document.getElementById(
        "textoVisionFirebase"
    ).textContent =
        textoVision || "";


    if (urlVision) {

        document.getElementById(
            "imgVisionFirebase"
        ).src =
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


    document.getElementById(
        "textoFilosofiaFirebase"
    ).textContent =
        textoFilosofia || "";


    if (urlFilosofia) {

        document.getElementById(
            "imgFilosofiaFirebase"
        ).src =
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


    document.getElementById(
        "textoEsmeraldasFirebase"
    ).textContent =
        textoEsmeraldas || "";


    if (urlEsmeraldas) {

        document.getElementById(
            "imgEsmeraldasFirebase"
        ).src =
            urlEsmeraldas;
    }

});