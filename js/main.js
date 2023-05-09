const indexNovedades = document.getElementById("index__novedades");
const indexExplorar = document.getElementById("index__vendidos");

const libros = [
    {
        id: "001",
        titulo: "Animal Farm",
        autor: "Orwell, George",
        genero: "Clásico",
        precio: 1250,
        img: "../img/AF.png"
    },
    {
        id: "002",
        titulo: "A Game of Thrones",
        autor: "Martin, George R.R.",
        genero: "Fantasía",
        precio: 1750,
        img: "../img/AGOT.png"
    },
    {
        id: "003",
        titulo: "And Then There Were None",
        autor: "Christie, Agatha",
        genero: "Misterio",
        precio: 1300,
        img: "../img/ATTWN.png"
    },
    {
        id: "004",
        titulo: "Fahrenheit 451",
        autor: "Bradbury, Ray",
        genero: "Ciencia Ficción",
        precio: 1250,
        img: "../img/F451.png"
    },
    {
        id: "005",
        titulo: "Frankenstein",
        autor: "Shelley, Mary",
        genero: "Clásico",
        precio: 1400,
        img: "../img/FRA.png"
    },
    {
        id: "006",
        titulo: "1Q84",
        autor: "Murakami, Haruki",
        genero: "Fantasía",
        precio: 1400,
        img: "../img/HM1Q84.png"
    },
    {
        id: "007",
        titulo: "Harry Potter And The Philosopher's Stone",
        autor: "Rowling, J.K.",
        genero: "Fantasía",
        precio: 1650,
        img: "../img/HPATPS.png"
    },
    {
        id: "008",
        titulo: "Jane Eyre",
        autor: "Bronte, Charlotte",
        genero: "Clásico",
        precio: 1350,
        img: "../img/JE.png"
    },
    {
        id: "009",
        titulo: "Lord Of The Flies",
        autor: "Golding, William",
        genero: "Clásico",
        precio: 1300,
        img: "../img/LOTF.png"
    },
    {
        id: "010",
        titulo: "Little Women",
        autor: "May Alcott, Louisa",
        genero: "Clásico",
        precio: 1300,
        img: "../img/LW.png"
    },
    {
        id: "011",
        titulo: "Milk And Honey",
        autor: "Kaur, Rupi",
        genero: "Poesía",
        precio: 1400,
        img: "../img/MAH.png"
    },
    {
        id: "012",
        titulo: "Matilda",
        autor: "Dahl, Roald",
        genero: "Infantil",
        precio: 1350,
        img: "../img/MAT.png"
    },
    {
        id: "013",
        titulo: "The Lightning Thief",
        autor: "Riordan, Rick",
        genero: "Juvenil",
        precio: 1550,
        img: "../img/PJTLT.png"
    },
    {
        id: "014",
        titulo: "The Book Thief",
        autor: "Zusak, Markus",
        genero: "Histórico",
        precio: 1400,
        img: "../img/TBT.png"
    },
    {
        id: "015",
        titulo: "The Catcher In The Rye",
        autor: "Salinger, J.D.",
        genero: "Clásico",
        precio: 1350,
        img: "../img/TCITR.png"
    },
    {
        id: "016",
        titulo: "The Dictionary Of Lost Words",
        autor: "Williams, Pip",
        genero: "Histórico",
        precio: 1500,
        img: "../img/TDOLW.png"
    },
    {
        id: "017",
        titulo: "The Fellowship Of The Ring",
        autor: "Tolkien, J.R.R.",
        genero: "Fantasía",
        precio: 1650,
        img: "../img/TDOTR.png"
    },
    {
        id: "018",
        titulo: "The Great Gatsby",
        autor: "Fitzgerald, F. Scott",
        genero: "Clásico",
        precio: 1250,
        img: "../img/TGG.png"
    },
    {
        id: "019",
        titulo: "The Hunger Games",
        autor: "Collins, Suzanne",
        genero: "Juvenil",
        precio: 1450,
        img: "../img/THG.png"
    },
    {
        id: "020",
        titulo: "The Handmaid's Tale",
        autor: "Atwood, Margaret",
        genero: "Ciencia Ficción",
        precio: 1600,
        img: "../img/THT.png"
    },
    {
        id: "021",
        titulo: "To Kill A Mockingbird",
        autor: "Lee, Harper",
        genero: "Clásico",
        precio: 1400,
        img: "../img/TKAM.png"
    },
    {
        id: "022",
        titulo: "The Little Prince",
        autor: "De Saint-Exupéry, Antoine",
        genero: "Clásico",
        precio: 1350,
        img: "../img/TLP.png"
    },
    {
        id: "023",
        titulo: "The Personal Librarian",
        autor: "Benedict, Marie",
        genero: "Histórico",
        precio: 1500,
        img: "../img/TPL.png"
    },
    {
        id: "024",
        titulo: "The Perks Of Being A Wallflower",
        autor: "Chbosky, Stephen",
        genero: "Juvenil",
        precio: 1450,
        img: "../img/TPOBAW.png"
    },
    {
        id: "025",
        titulo: "The Picture Of Dorian Gray",
        autor: "Wilde, Oscar",
        genero: "Clásico",
        precio: 1400,
        img: "../img/TPODG.png"
    },
    {
        id: "026",
        titulo: "The Shining",
        autor: "King, Stephen",
        genero: "Terror",
        precio: 1650,
        img: "../img/TS.png"
    },
    {
        id: "027",
        titulo: "Without A Trace",
        autor: "Steel, Danielle",
        genero: "Romance",
        precio: 1550,
        img: "../img/WAT.png"
    }
];

let carrito = [];

let seleccionSeisNovedades = [23, 22, 5, 11, 3, 1];
let indexSeisNovedades = seleccionSeisNovedades.map((indice) => libros[indice]);

indexSeisNovedades.forEach((libro) => {
    let content = document.getElementById("index__novedades");
    let libroElement = document.createElement("div");
    libroElement.setAttribute("class", "col-sm-6 col-lg-4");
    libroElement.innerHTML = `
        <a href="index.html">
            <img src="${libro.img}" class="libro__imagen" alt="${libro.titulo}">
            <p class="libro__nombre">${libro.titulo}</p>
        </a>
        <p class="libro__precio">$${libro.precio}</p>
    `;
    content.appendChild(libroElement);
});

let seleccionSeisVendidos = [6, 21, 17, 9, 4, 20];
let indexSeisVendidos = seleccionSeisVendidos.map((indice) => libros[indice]);

indexSeisVendidos.forEach((libro) => {
    let content = document.getElementById("index__vendidos");
    let libroElement = document.createElement("div");
    libroElement.setAttribute("class", "col-sm-6 col-lg-4");
    libroElement.innerHTML = `
        <a href="index.html">
            <img src="${libro.img}" class="libro__imagen" alt="${libro.titulo}">
            <p class="libro__nombre">${libro.titulo}</p>
        </a>
        <p class="libro__precio">$${libro.precio}</p>
    `;
    content.appendChild(libroElement);
});