// JavaScript correspondiente a index.html

const indexCarrito = document.querySelector("#carrito__index");
let libros;
let carrito = [];

fetch("js/catalogo.json")
    .then(response => response.json())
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
                        <button class="boton d-inline-block text-uppercase" data-id="${libro.id}" onclick="agregarCarrito(${libro.id})">Comprar</button>
                    </div>
                </div>`;
        }

        novedadesHTML += `</div>`;
        vendidosHTML += `</div>`;

        document.querySelector("#index__novedades").innerHTML = novedadesHTML;
        document.querySelector("#index__vendidos").innerHTML = vendidosHTML;
    });

carritoVacio();

// LOCALSTORAGE
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

// CARRITO VACÍO (por default)
function carritoVacio() {
    if (carrito.length <= 0) {
        indexCarrito.innerHTML = "";
        const carritoDefault = document.createElement("p");
        carritoDefault.classList.add("text-center");
        carritoDefault.innerHTML = `El carrito está vacío.`;
        indexCarrito.append(carritoDefault);
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
            librosCarrito.classList.add("carrito__contenedor");

            librosCarrito.innerHTML = `
                <img src="${libro.img}" class="carrito__libro">
                <h4>${libro.titulo}</h4>
                <p>$${libro.precio}</p>
                <div>
                    <button type="button" class="botonMenos boton py-2 px-3" onclick="restarLibros(${libro.id})">-</button>
                    <button class="boton py-2 px-3">${libro.cantidad}</button>
                    <button type="button" class="botonMas boton py-2 px-3" onclick="sumarLibros(${libro.id})">+</button>
                </div>`;
            indexCarrito.append(librosCarrito);
        });

        carritoTotal();

        const botonLimpiar = document.createElement("div");
        botonLimpiar.classList.add("carrito__botones");
        botonLimpiar.innerHTML = `
            <button type="button" class="botonVaciar boton py-2 px-3" onclick="vaciarCarrito()">Vaciar</button>
            <button type="button" class="botonComprar boton py-2 px-3" onclick="pagarCarrito()">Comprar</button>`;
        indexCarrito.append(botonLimpiar);

        sumarLibros();
        restarLibros();
        vaciarCarrito();
        pagarCarrito();
    } else {
        carritoVacio();
    }
}

// AGREGAR LIBROS
function agregarCarrito(id) {
    const carrito = cargarCarrito();
    let pos = carrito.findIndex(stock => stock.id === id);

    if (pos >= 0) {
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

// AGREGAR MÁS LIBROS DEL MISMO PRODUCTO
function sumarLibros() {
    const botonMas = document.querySelectorAll(".botonMas");
    botonMas.forEach((boton, i) => {
        boton.addEventListener("click", (e) => {
            const carrito = cargarCarrito();
            const producto = carrito[i];
            producto.cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });
    });
}

// QUITAR LIBROS
function restarLibros() {
    const botonMenos = document.querySelectorAll(".botonMenos");
    botonMenos.forEach((boton, i) => {
        boton.addEventListener("click", (e) => {
            const carrito = cargarCarrito();
            const producto = carrito[i];
            if (producto.cantidad > 1) {
                producto.cantidad--;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            }
        });
    });
}

// VACIAR CARRITO
function vaciarCarrito() {
    const botonVaciar = document.querySelector(".botonVaciar");
    botonVaciar.addEventListener("click", () => {
        swal.fire({
            title: "¿Te gustaría vaciar el carrito?",
            icon: "warning",
            iconColor: "#DB2D3B",
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#2A9D8F",
            denyButtonText: `Cancelar`,
            denyButtonColor: "#DB2D3B",
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    icon: "success",
                    iconColor: "#2A9D8F",
                    text: `El carrito está vacío.`,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#000000",
                });
                carritoNulo();
                carrito = [];
            }
        });
    });
}

function carritoNulo() {
    carrito.forEach((libro) => (libro.cantidad = 1));
    carrito.length = 0;
    indexCarrito.innerHTML = "";
    carritoVacio();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carrito = [];
}

// TOTAL DE LA COMPRA
function carritoTotal() {
    const carrito = cargarCarrito();
    totalCompra = carrito.reduce((acumulador, libro) => { return acumulador + libro.precio * libro.cantidad; }, 0);
    const carritoTotal = document.createElement("div");
    carritoTotal.innerHTML = `
        <hr>
        <p class="text-end">Total: $${totalCompra}</p>`;
    indexCarrito.append(carritoTotal);
}

// PAGAR
function pagarCarrito() {
    const botonComprar = document.querySelector(".botonComprar");
    botonComprar.addEventListener("click", () => {
        swal.fire({
            title: "¿Te gustaría finalizar tu compra?",
            icon: "warning",
            iconColor: "#DB2D3B",
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#211C88",
            denyButtonText: `Seguir comprando`,
            denyButtonColor: "#2A9D8F",
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    icon: "success",
                    iconColor: "#211C88",
                    text: `¡Gracias por tu compra!`,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#000000",
                });
                carritoNulo();
                carrito = [];
            }
        });
    });
}

// Falta que al agregar libros se sumen a los mismos, no aparte (si yo agrego dos
// veces El Principito, aparece cada libro por separado, no sumándose a la misma cantidad)

// ¿Por qué al comprar o vaciar carrito no me deja
// realizar una nueva compra? (tengo que apretar F5)