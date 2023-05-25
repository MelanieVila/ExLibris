const indexCarrito = document.querySelector(".carrito__contenedor");
const carritoCero = document.querySelector(".carrito__vacio");
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
        quitarLibros();
        carritoTotal();
    });

let carrito = [];

carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function carritoVacio() {
    if (carrito.length === 0) {
        carritoCero.innerHTML = "";
        const carritoDefault = document.createElement("p");
        carritoDefault.classList.add("text-center");
        carritoDefault.innerHTML = `El carrito está vacío.`;
        carritoCero.append(carritoDefault);
    }
    localStorage.clear(); // A CHEQUEAR
}

function mostrarCarrito() {
    indexCarrito.innerHTML = "";

    if (carrito.length > 0) {
        carrito.forEach((libro) => {
            const librosCarrito = document.createElement("div");

            librosCarrito.innerHTML = `
                <img class="carrito__libro" src="${libro.img}">
                <h4>${libro.titulo}</h4>
                <p>$${libro.precio}</p>
                <div>
                    <button class="botonMenos boton py-2 px-3">-</button>
                    <button class="boton py-2 px-3">${libro.cantidad}</button>
                    <button class="botonMas boton py-2 px-3">+</button>
                </div>
                <button id="${libro.id}" class="botonQuitar boton py-2 px-3">Quitar</button>`;
            indexCarrito.append(librosCarrito);
        });
        carritoTotal();

        const botonLimpiar = document.createElement("div");
        botonLimpiar.innerHTML = `
            <button class="botonVaciar boton py-2 px-3">Vaciar</button>
            <button class="botonComprar boton py-2 px-3">Comprar</button>`;
        indexCarrito.append(botonLimpiar);

        quitarLibros();
        sumarLibros();
        restarLibros();
    } else {
        carritoVacio();
    }
}

function carritoBoton() {
    const carritoBotones = document.querySelectorAll(".agregar__carrito");
    carritoBotones.forEach((boton) => {
        boton.addEventListener("click", agregarCarrito);
    });
}

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

function quitarLibros() {
    const quitarLibro = document.querySelectorAll(".botonQuitar");
    quitarLibro.forEach((boton) => {
        boton.addEventListener("click", () => {
            const deleted = carrito.find((libro) => libro.id === idBoton);
            deleted.cantidad = 1;
            const index = carrito.indexOf(deleted);
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
            carritoVacio();
        });
    });
}

function carritoTotal() {
    totalCompra = carrito.reduce((accum, producto) => {
        return accum + producto.precio * producto.cantidad;
    }, 0);
    const carritoTotal = document.createElement("div");
    carritoTotal.innerHTML = `
        <hr class="mt-8 mb-4">
        <p class="total col-span-2 text-right">Total: $${totalCompra}</p>`;
    indexCarrito.append(carritoTotal);
}