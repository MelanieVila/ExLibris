const indexCarrito = document.querySelector(".carrito__contenedor");
const indexCarritoVacio = document.querySelector(".carrito__vacio");
let libros;

fetch("js/catalogo.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        libros = data.libros;
        guardarProductos(libros);
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
                        <button class="boton d-inline-block text-uppercase agregar__carrito" data-id="${libro.id}" onclick="agregarCarrito(${libro.id})">Comprar</button>
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
                        <button class="boton d-inline-block text-uppercase agregar__carrito" data-id="${libro.id}" onclick="agregarCarrito(${libro.id})">Comprar</button>
                    </div>
                </div>`;
        }

        novedadesHTML += `</div>`;
        vendidosHTML += `</div>`;

        document.querySelector("#index__novedades").innerHTML = novedadesHTML;
        document.querySelector("#index__vendidos").innerHTML = vendidosHTML;

        carritoTotal();
    });

function cargarProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(productos) {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

/* const productos = cargarProductos();
const carrito = cargarCarrito(); */

// CARRITO VACÍO
function carritoVacio() {
    if (carrito.length <= 0) {
        indexCarritoVacio.innerHTML = "";
        const carritoDefault = document.createElement("p");
        carritoDefault.classList.add("text-center");
        carritoDefault.innerHTML = `El carrito está vacío.`;
        indexCarritoVacio.append(carritoDefault);
    }
    localStorage.clear();
}

// MOSTRAR CARRITO
function mostrarCarrito() {
    indexCarrito.innerHTML = "";
    const carrito = cargarCarrito();

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

// AGREGAR LIBROS AL CARRITO
function agregarCarrito(id) {
    const carrito = cargarCarrito();
    let pos = carrito.findIndex(stock => stock.id === id);
    
    if (pos > -1) {
        carrito[pos].cantidad++;
    } else {
        const productos = cargarProductos();
        let producto = productos.find((stock) => stock.id == id);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarrito(carrito);
    mostrarCarrito();
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
    const carrito = cargarCarrito();
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