const indexCarrito = document.querySelector(".carrito__contenedor");
const indexCarritoVacio = document.querySelector(".carrito__vacio");
let libros;
let carrito = [];

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

// CARRITO VACÍO (por default)
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
                    <button type="button" class="botonMenos boton py-2 px-3" onclick="restarLibros(${libro.id})">-</button>
                    <button class="boton py-2 px-3">${libro.cantidad}</button>
                    <button type="button" class="botonMas boton py-2 px-3" onclick="sumarLibros(${libro.id})">+</button>
                </div>`;
            indexCarrito.append(librosCarrito);
        });
        carritoTotal();

        const botonLimpiar = document.createElement("div");
        botonLimpiar.innerHTML = `
            <button type="button" class="botonVaciar boton py-2 px-3" onclick="vaciarCarrito">Vaciar</button>
            <button type="button" class="botonComprar boton py-2 px-3" onclick="pagarCarrito">Comprar</button>`;
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

// AGREGAR MÁS LIBROS DEL MISMO PRODUCTO
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

// QUITAR LIBROS
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

// VACIAR CARRITO
function vaciarCarrito() {
    const botonVaciar = document.querySelector(".botonVaciar");
    botonVaciar.addEventListener("click", () => {
        Swal.fire({
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
                Swal.fire({
                    icon: "success",
                    iconColor: "#2A9D8F",
                    text: `El carrito está vacío.`,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#000000",
                });
                carritoNulo();
            }
        });
    });
}

function carritoNulo() {
    carrito.forEach((libro) => (libro.cantidad = 1));
    carrito.length = 0;
    indexCarrito.innerHTML = "";
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoVacio();
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

// PAGAR
function pagarCarrito() {
    const botonComprar = document.querySelector(".botonComprar");
    botonComprar.addEventListener("click", () => {
        Swal.fire({
            title: "¿Te gustaría finalizar tu compra?",
            icon: "warning",
            iconColor: "#DB2D3B",
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#2A9D8F",
            denyButtonText: `Seguir comprando`,
            denyButtonColor: "#DB2D3B",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    iconColor: "#211C88",
                    text: `¡Gracias por tu compra!`,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#000000",
                });
                carritoNulo();
            }
        });
    });
}

// Falta agregar que aparezca "El carrito está vacío." por default
// Falta que al agregar libros se sumen a los mismos, no aparte