// Swiper Slider

var swiper = null;
var swiper2 = null;

window.iniciarSwiper = function () {

    swiper = new Swiper(".bg-slider-thumbs", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 0,
    });

    swiper2 = new Swiper(".bg-slider", {
        loop: true,
        spaceBetween: 0,

        thumbs: {
            swiper: swiper,
        },
    });
}

// Navigation bar effects on scroll
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

//Responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

//==============================
// Animaciones al hacer scroll
//==============================

const animatedElements = document.querySelectorAll(
    ".about-title, .about-subtitle, .about-intro, .about-card, .gallery-item"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            // Retraso para los párrafos
            if(entry.target.classList.contains("about-intro")){

                setTimeout(() => {

                    entry.target.classList.add("show");

                },250);

            }else{

                entry.target.classList.add("show");

            }

            // Solo anima una vez
            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

animatedElements.forEach(element => {

    observer.observe(element);

});

function mostrarBotones(event, boton){

    event.preventDefault();

    const programa = boton.closest(".programa");
    const botones = programa.querySelector(".contenedor-botones");
    const info = programa.querySelector(".contenido-info");

    botones.classList.toggle("mostrar");
    info.classList.toggle("activo");

    if(botones.classList.contains("mostrar")){
        boton.innerHTML="Ver Menos ▲";
    }else{

        boton.innerHTML="Ver Más ▼";

        programa.querySelectorAll(".contenido-programa").forEach(c=>{
            c.classList.remove("activo");
        });

    }

}

function mostrarContenido(event, boton, indice){

    event.preventDefault();

    const programa = boton.closest(".programa");

    const contenidos = programa.querySelectorAll(".contenido-programa");

    contenidos.forEach(c=>{
        c.classList.remove("activo");
    });

    contenidos[indice].classList.add("activo");

}

let categoriaActual = "";
let indiceSubmenuActual = 0;
let imagenActual = 0;

const categorias = {

    productiva:{

        nombre:"Cuna Productiva",

        submenu:[

            {
                titulo:"Escuela Rural Campesina",

                imagenes:[
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen1.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen2.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen3.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen4.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen5.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen6.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen7.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen8.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen9.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen10.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen11.JPG",
                    "images/Galeria/Cuna Productiva/Escuela Rural Campesina/Imagen12.JPG",
                ]
            },

            {
                titulo:"Proveedores Locales",

                imagenes:[
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen1.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen2.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen3.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen4.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen5.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen6.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen7.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen8.JPG",
                    "images/Galeria/Cuna Productiva/Proveedores Locales/Imagen9.JPG",
                ]
            },

            {
                titulo:"Turismo Experiencia Verde",

                imagenes:[
                    "images/Galeria/Cuna Productiva/Turismo, Experiencia Verde/Imagen1.JPG",
                    "images/Galeria/Cuna Productiva/Turismo, Experiencia Verde/Imagen2.JPG",
                    "images/Galeria/Cuna Productiva/Turismo, Experiencia Verde/Imagen3.JPG",
                    "images/Galeria/Cuna Productiva/Turismo, Experiencia Verde/Imagen4.JPG",
                ]
            }

        ]

    },

    educativa:{

        nombre:"Cuna Educativa",

        submenu:[

            {

                titulo:"Aportando al futuro de Maripi",

                imagenes:[
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen1.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen2.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen3.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen4.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen5.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen6.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen7.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen8.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen9.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen10.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen11.JPEG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen12.JPEG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen13.JPEG",
                    "images/Galeria/Cuna Educativa y Cultural/Aportando al futuro de Maripi/Imagen14.JPEG",
                ]

            },

            {

                titulo:"Re-creando la tradición",

                imagenes:[
                    "images/Galeria/Cuna Educativa y Cultural/Re-creando la Tradición/Imagen 1.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Re-creando la Tradición/Imagen 2.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/Re-creando la Tradición/Imagen 3.JPEG",
                ]

            },

            {

                titulo:"De regreso a la escuela",

                imagenes:[
                    "images/Galeria/Cuna Educativa y Cultural/De regreso a la Escuela/Imagen 1.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/De regreso a la Escuela/Imagen 2.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/De regreso a la Escuela/Imagen 3.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/De regreso a la Escuela/Imagen 4.JPG",
                    "images/Galeria/Cuna Educativa y Cultural/De regreso a la Escuela/Imagen 5.JPG",
                ]

            },

            {

                titulo:"Tiempo libre con sentido",

                imagenes:[
                    "images/Galeria/Cuna Educativa y Cultural/Tiempo libre con sentido/Imagen 1.JPG",
                ]

            }

        ]

    },

    paz:{

        nombre:"Cuna del desarrollo y la paz",

        submenu:[

            {

                titulo:"Laboratorio de Desarrollo y Paz",

                imagenes:[
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen1.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen2.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen3.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen4.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen5.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen6.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen7.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen8.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen9.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen10.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen11.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen12.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen13.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen14.JPEG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Laboratorio de Desarrollo y Paz/Imagen15.JPEG",
                ]

            },

            {

                titulo:"Mesa de dialogo multiactor",

                imagenes:[
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen1.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen2.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen3.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen4.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen5.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen6.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen7.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen8.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen9.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen10.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen11.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen12.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen13.JPG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen14.JPEG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen15.JPEG",
                    "images/Galeria/Cuna del Desarrollo y la paz/Mesa de Dialogo Multiactor/Imagen16.JPEG",
                ]

            },

        ]

    },

    empresa:{

        nombre:"Esmeraldas Santa Rosa",

        submenu:[

            {

                titulo:"Esmeraldas Santa Rosa",

                imagenes:[
                    "images/Galeria/Esmeraldas santa rosa/Imagen1.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen2.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen3.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen4.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen5.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen6.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen7.JPG",
                    "images/Galeria/Esmeraldas santa rosa/Imagen8.JPG",
                ]

            },

        ]

    }

};

function crearSubmenu(categoria){

    const submenu = document.getElementById("submenu");

    submenu.innerHTML = "";

    categorias[categoria].submenu.forEach((item, indice)=>{

        submenu.innerHTML += `
            <button
                class="submenu-btn ${indice == 0 ? 'activo' : ''}"
                onclick="seleccionarSubmenu('${categoria}', ${indice}, this)">

                ${item.titulo}

            </button>
        `;

    });

}

function seleccionarSubmenu(categoria, indice, boton){

    document.querySelectorAll(".submenu-btn").forEach(btn=>{
        btn.classList.remove("activo");
    });

    boton.classList.add("activo");

    categoriaActual = categoria;
    indiceSubmenuActual = indice;

    cargarGaleria(categoria, indice);

}

function cargarGaleria(categoria, indice){

    const contenedor = document.getElementById("galeria-contenido");

    contenedor.innerHTML = "";

    const imagenes = categorias[categoria].submenu[indice].imagenes;

    imagenes.forEach((imagen, i)=>{

        contenedor.innerHTML +=

        `
            <div class="foto-card"
                onclick="abrirLightbox(${i})">

                <img src="${imagen}" alt="">

                <div class="overlay-foto">

                    <span>Ampliar imagen</span>

                </div>

            </div>

        `;

    });

}

function cambiarCategoria(nombre, boton){

    document.querySelectorAll(".menu-btn").forEach(btn=>{

        btn.classList.remove("activo");

    });

    boton.classList.add("activo");

    crearSubmenu(nombre);

    cargarGaleria(nombre,0);

}

function abrirLightbox(indice){

    imagenActual = indice;

    const imagenes = categorias[categoriaActual]
        .submenu[indiceSubmenuActual]
        .imagenes;

    document.getElementById("lightbox")
        .classList.add("activo");

    document.getElementById("imagenLightbox")
        .src = imagenes[indice];

    actualizarContador();

}

function cerrarLightbox(){

    document
        .getElementById("lightbox")
        .classList.remove("activo");

}

function cambiarImagen(direccion){

    const imagenes = categorias[categoriaActual]
        .submenu[indiceSubmenuActual]
        .imagenes;

    imagenActual += direccion;

    if(imagenActual < 0){

        imagenActual = imagenes.length - 1;

    }

    if(imagenActual >= imagenes.length){

        imagenActual = 0;

    }

    document.getElementById("imagenLightbox")
        .src = imagenes[imagenActual];

    actualizarContador();

}

function actualizarContador(){

    const total = categorias[categoriaActual]
        .submenu[indiceSubmenuActual]
        .imagenes.length;

    document.getElementById("contador")
        .innerHTML = `${imagenActual+1} / ${total}`;

}

document.addEventListener("keydown", function(e){

    const lightbox = document.getElementById("lightbox");

    if(!lightbox.classList.contains("activo")) return;

    if(e.key==="ArrowRight"){

        cambiarImagen(1);

    }

    if(e.key==="ArrowLeft"){

        cambiarImagen(-1);

    }

    if(e.key==="Escape"){

        cerrarLightbox();

    }

});

window.onload = function(){

    crearSubmenu("productiva");

    categoriaActual = "productiva";
    indiceSubmenuActual = 0;

    cargarGaleria("productiva",0);

    iniciarMapa();

}

const sedes = [

    {

        nombre:"Sede Chiquinquirá",

        ciudad:"Chiquinquirá",

        direccion:"Cra XX # XX-XX",

        telefono:"+57 310 000 0000",

        correo:"chiquinquira@fundacionsantarosa.org",

        lat:5.616,

        lng:-73.817

    },

    {

        nombre:"Sede Pauna",

        ciudad:"Pauna",

        direccion:"Calle XX # XX-XX",

        telefono:"+57 310 000 0000",

        correo:"pauna@fundacionsantarosa.org",

        lat:5.659,

        lng:-73.982

    },

    {

        nombre:"Sede Otanche",

        ciudad:"Otanche",

        direccion:"Carrera XX # XX-XX",

        telefono:"+57 310 000 0000",

        correo:"otanche@fundacionsantarosa.org",

        lat:5.657,

        lng:-74.183

    },

    {

        nombre:"Sede Moniquirá",

        ciudad:"Moniquirá",

        direccion:"Carrera XX # XX-XX",

        telefono:"+57 310 000 0000",

        correo:"moniquira@fundacionsantarosa.org",

        lat:5.878,

        lng:-73.572

    },

    {

        nombre:"Sede Barbosa",

        ciudad:"Barbosa",

        direccion:"Carrera XX # XX-XX",

        telefono:"+57 310 000 0000",

        correo:"barbosa@fundacionsantarosa.org",

        lat:5.933,

        lng:-73.615

    },

    {

        nombre:"Sede Bogotá",

        ciudad:"Bogotá",

        direccion:"Carrera XX # XX-XX",

        telefono:"+57 310 000 0000",

        correo:"bogota@fundacionsantarosa.org",

        lat:4.711,

        lng:-74.072

    }

];

function iniciarMapa(){

    const mapa = L.map('mapa').setView([5.73,-73.45],8);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; OpenStreetMap contributors'
        }
    ).addTo(mapa);

sedes.forEach((sede)=>{

    const marker = L.marker([sede.lat, sede.lng])
        .addTo(mapa)
        .bindPopup(`
            <div class="popup-sede">

                <h3>${sede.nombre}</h3>

                <p>📍 ${sede.direccion}</p>

                <p>📞 ${sede.telefono}</p>

                <p>✉  ${sede.correo}</p>

                <a
                    class="btn-mapa"
                    href="https://www.google.com/maps?q=${sede.lat},${sede.lng}"
                    target="_blank">

                    Cómo llegar

                </a>

            </div>
        `);

    marker.on("click", function(){

        mostrarInformacion(sede);

    });

});

}

function mostrarInformacion(sede){

    document.getElementById("info-sede").innerHTML = `

        <h3>${sede.nombre}</h3>

        <img src="${sede.imagen}" class="foto-sede">

        <p><strong>📍 Dirección:</strong><br>${sede.direccion}</p>

        <p><strong>📞 Teléfono:</strong><br>${sede.telefono}</p>

        <p><strong>✉ Correo:</strong><br>${sede.correo}</p>

        <a href="https://www.google.com/maps?q=${sede.lat},${sede.lng}"

           target="_blank">

            Cómo llegar

        </a>

    `;

}