const indexCarrito = document.querySelector(".carrito__contenedor");
const indexCarritoVacio = document.querySelector(".carrito__vacio");
let libros;

fetch("js/catalogo.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        libros = data.libros;
        let librosNovedades = libros.filter(libro => libro.novedad === true);
        let librosVendidos = libros.filter(libro => libro.popular === true);

        let novedadesHTML = `<div class="row">`;
        let vendidosHTML = `<div class="row">`;

        for (let libro of librosNovedades) {
            novedadesHTML +=
                `<div class="col-sm-6 col-lg-4">
                    <a href="index.html">
                        <img src="${libro.img}" class="libro__imagen" alt="${libro.titulo}">
                        <h2 class="libro__nombre">${libro.titulo}</h2>
                    </a>
                    <p class="libro__precio">$${libro.precio}</p>

                    <div class="alinear-boton">
                        <button class="boton d-inline-block text-uppercase agregar__carrito" data-id="${libro.id}">Comprar</button>
                    </div>
                </div>`;
        }

        for (let libro of librosVendidos) {
            vendidosHTML +=
                `<div class="col-sm-6 col-lg-4">
                    <a href="index.html">
                        <img src="${libro.img}" class="libro__imagen" alt="${libro.titulo}">
                        <h2 class="libro__nombre">${libro.titulo}</h2>
                    </a>
                    <p class="libro__precio">$${libro.precio}</p>

                    <div class="alinear-boton">
                        <button class="boton d-inline-block text-uppercase agregar__carrito" data-id="${libro.id}">Comprar</button>
                    </div>
                </div>`;
        }

        novedadesHTML += `</div>`;
        vendidosHTML += `</div>`;

        document.querySelector("#index__novedades").innerHTML = novedadesHTML;
        document.querySelector("#index__vendidos").innerHTML = vendidosHTML;

        carritoVacio();
        mostrarCarrito();
        carritoBoton();
        agregarCarrito();
        sumarLibros();
        restarLibros();
        carritoTotal();
    });

let carrito = [];

carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// CARRITO VACÍO, párrafo default
function carritoVacio() { // FALTA ARREGLAR POR QUÉ AL ACTUALIZAR LA PÁGINA ¡A VECES! SE VE EL MENSAJE "carritoDefault" (lo ideal: siempre)
    if (carrito.length <= 0) {
        indexCarritoVacio.innerHTML = "";
        const carritoDefault = document.createElement("p");
        carritoDefault.classList.add("text-center");
        carritoDefault.innerHTML = `El carrito está vacío.`;
        indexCarritoVacio.append(carritoDefault);
    }
    localStorage.clear(); // A CHEQUEAR
}

// MOSTRAR CARRITO
function mostrarCarrito() {
    indexCarrito.innerHTML = "";

    if (carrito.length > 0) {
        carrito.forEach((libro) => {
            const librosCarrito = document.createElement("div");

            librosCarrito.innerHTML = `
                <img src="${libro.img}" class="carrito__libro">
                <h4>${libro.titulo}</h4>
                <p>$${libro.precio}</p>
                <div>
                    <button class="botonMenos boton py-2 px-3">-</button>
                    <button class="boton py-2 px-3">${libro.cantidad}</button>
                    <button class="botonMas boton py-2 px-3">+</button>
                </div>`;
            indexCarrito.append(librosCarrito);
        });
        carritoTotal();

        const botonLimpiar = document.createElement("div");
        botonLimpiar.innerHTML = `
            <button class="botonVaciar boton py-2 px-3">Vaciar</button>
            <button class="botonComprar boton py-2 px-3">Comprar</button>`;
        indexCarrito.append(botonLimpiar);

        sumarLibros();
        restarLibros();
    } else {
        carritoVacio();
    }
}

// BOTÓN PARA AGREGAR AL CARRITO
function carritoBoton() {
    const carritoBotones = document.querySelectorAll(".agregar__carrito");
    carritoBotones.forEach((boton) => {
        boton.addEventListener("click", agregarCarrito);
    });
}

// AGREGAR LIBROS AL CARRITO
function agregarCarrito() {
    const stockDisponible = carrito.find((stock) => stock.id === libro.id);

    if (stockDisponible) {
        stockDisponible.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    } else {
        carrito.push(stockDisponible);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

// AGREGAR MÁS LIBROS AL CARRITO
function sumarLibros() {
    const botonMas = document.querySelectorAll(".botonMas");
    botonMas.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            const libroSeleccionado = carrito[index];
            libroSeleccionado.cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });
    });
}

// QUITAR LIBROS DEL CARRITO
function restarLibros() {
    const botonMenos = document.querySelectorAll(".botonMenos");
    botonMenos.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            const libroSeleccionado = carrito[index];
            if (libroSeleccionado.cantidad > 1) {
                libroSeleccionado.cantidad--;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            }
        });
    });
}

// TOTAL DE LA COMPRA
function carritoTotal() {
    totalCompra = carrito.reduce((accum, libro) => { return accum + libro.precio * libro.cantidad; }, 0);
    const carritoTotal = document.createElement("div");
    carritoTotal.innerHTML = `
        <hr class="mt-8 mb-4">
        <p class="total col-span-2 text-right">Total: $${totalCompra}</p>`;
    indexCarrito.append(carritoTotal);
}

// Falta agregar función para pagar
// Falta agregar función para vaciar carrito
// Falta Sweet Alert