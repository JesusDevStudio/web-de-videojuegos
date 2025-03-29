// Espera a que el contenido del documento HTML se haya cargado completamente antes de ejecutar el código
/*document.addEventListener('DOMContentLoaded', function () {
    // Obtiene la URL actual del navegador
    const urlLocation = window.location.href;

    // Verifica si la URL actual incluye "galeria.html"
    if (urlLocation.includes("galeria.html")) {
        // Encuentra el enlace actual que apunta a "galeria.html"
        const currentLink = document.querySelector('a[href="galeria.html"]');
        
        // Verifica si se encontró el enlace actual
        if (currentLink) {
            // Cambia el color del enlace actual a "red" (rojo)
            currentLink.style.color = 'red';
        }
    }
});*/

// Inicialización del objeto Swiper para la galería de imágenes
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlack: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

//Carrito de compras
let totalCarrito = 0;
const totalPrecioElemento = document.getElementById("total-precio");
const carrito = document.getElementById("carrito");
const elementos = document.getElementById("lista");
const elementos2 = document.getElementById("lista-2");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

// Función para cargar los listeners de eventos
function cargarEventListeners() {
    elementos.addEventListener("click", comprarElemento);
    elementos2.addEventListener("click", comprarElemento);
    carrito.addEventListener("click", eliminarElemento);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

// Función para agregar un elemento al carrito de compras
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

// Función para leer los datos de un elemento a agregar al carrito de compras
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector("img").src,
        titulo: elemento.querySelector("h3").textContent,
        precio: elemento.querySelector(".precio").textContent,
        id: elemento.querySelector("a").getAttribute("data-id")
    }
    insertarCarrito(infoElemento);
}

// Función para insertar un elemento en el carrito de compras
function insertarCarrito(elemento) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;

    lista.appendChild(row);

    totalCarrito += parseFloat(elemento.precio.replace("$", ""));
    totalPrecioElemento.textContent = `$${totalCarrito.toFixed(2)}`;
    guardarElementoLocalStorage(elemento);

    // Alerta al agregar elemento al carrito
    Swal.fire({
        title: "¿Estás seguro de añadir al carrito?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Añadir",
        denyButtonText: `No añadir`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Añadido al carrito',
                text: `${elemento.titulo} ha sido añadido al carrito.`,
                showConfirmButton: false,
                timer: 1500 
            });
        } else if (result.isDenied) {
            Swal.fire("No se ha añadido el producto", "", "info");
        }
    });
}

// Función para eliminar un elemento del carrito de compras
function eliminarElemento(e) {
    e.preventDefault();

    let elemento;
    let elementoId;
    let elementoPrecio;

    if (e.target.classList.contains("borrar")) {
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector("a").getAttribute("data-id");

        if (elementoId) {
            elementoPrecio = parseFloat(elemento.querySelector("td:nth-child(3)").textContent.replace("$", ""));
            elemento.remove();
            eliminarElementoLocalStorage(elementoId);
            restarPrecioCarrito(elementoPrecio);
        }
    }
}

// Función para restar el precio del carrito de compras al eliminar un elemento
function restarPrecioCarrito(precio) {
    if (!isNaN(precio)) {
        totalCarrito -= precio;
        totalPrecioElemento.textContent = `$${totalCarrito.toFixed(2)}`;
    }
}

// Función para vaciar el carrito de compras
function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estos cambios no se podrán deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Vaciado!",
                text: "El carrito ha sido vaciado con éxito",
                icon: "success"
            });
            while (lista.firstChild) {
                lista.removeChild(lista.firstChild);
            }

            vaciarLocalStorage();

            totalCarrito = 0;
            totalPrecioElemento.textContent = "$0.00";

            return false;
        }
    });
}

// Función para guardar un elemento en el almacenamiento local
function guardarElementoLocalStorage(elemento) {
    let elementos;
    elementos = obtenerelementosLocalStorage();
    elementos.push(elemento);
    localStorage.setItem("elementos", JSON.stringify(elementos));
}

// Función para obtener los elementos del almacenamiento local
function obtenerelementosLocalStorage() {
    let elementosLS;
    if (localStorage.getItem("elementos") === null) {
        elementosLS = [];
    } else {
        elementosLS = JSON.parse(localStorage.getItem("elementos"));
    }
    return elementosLS;
}

// Función para leer los elementos del almacenamiento local al cargar la página
function leerLocalStorage() {
    let elementosLS;
    elementosLS = obtenerelementosLocalStorage();
    elementosLS.forEach(function (elemento) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width="100">
            </td>
            <td>
                ${elemento.titulo}
            </td>
            <td>
                ${elemento.precio}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">`
        })}