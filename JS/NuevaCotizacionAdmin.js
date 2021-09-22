var identificacion = document.getElementById("identificacion");
var cliente = document.getElementById("cliente");
var productos = document.getElementById("productos");
var cantProductos = document.querySelector('#numero');
var agregarProductos = document.querySelector('#agregar-producto');
var btnGuardar = document.querySelector("#btn-Guardar");
var btnImprimir = document.querySelector('#btn-Imprimir');
const addProductos = document.querySelector('#productos-list');
const footerPro = document.getElementById('footer-pro');
const templateTotal = document.querySelector('#template-total').content;
const templateProductos = document.querySelector('#template-productos').content;
const fragment = document.createDocumentFragment();

var localCotizaciones = 'cotizaciones';
var localProductos = 'productos';
var datos = localStorage.getItem(localProductos);
let arrayProductos = {}


var sessionStorageKeyNameEditarCotizaciones = 'editarcotizaciones';

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos()
})

function cargarProductos() {
    var clientes = [];
    if (datos !== null) {
        clientes = JSON.parse(datos);
    }
    // clientes.splice(2, 1);
    // localStorage.setItem(localProductos, JSON.stringify(clientes));

    agregarProductos.addEventListener('click', function() {
        if (cantProductos.value.length === 0 || cantProductos.value == 0) return;
        pintarProducto(clientes)
    })

    // console.log(clientes);
}

function pintarProducto(clientes) {
    var cont = 0
    clientes.forEach(item => {

        if (item.nombre.toLowerCase() == productos.value.toLowerCase()) {
            addProducto(item)
            cont++
        }
    });
    if (cont < 1) {
        swal({
            text: "El producto no se encuentra en el inventario",
            icon: "error",
        });
    }
}

const addProducto = objeto => {
    // console.log(objeto)

    const producto = {
        nombre: objeto.nombre,
        cantidad: parseInt(cantProductos.value),
        precio: objeto.pSalida
    }
    productos.value = ''
    cantProductos.value = ''


    // console.log(arrayProductos)
    if (arrayProductos.hasOwnProperty(producto.nombre)) {
        producto.cantidad += arrayProductos[producto.nombre].cantidad
    }

    arrayProductos[producto.nombre] = {...producto }
    console.log(arrayProductos)

    if (producto.cantidad <= 0) {
        delete arrayProductos[producto.nombre]
    }
    mostrarProducto()

}



const mostrarProducto = () => {
    addProductos.innerHTML = ''
    if (Object.keys(arrayProductos).length === 0) {
        footerPro.innerHTML = `<th>Agregue productos!</th>`
        return
    }
    Object.values(arrayProductos).forEach(producto => {
        templateProductos.querySelector('th').textContent = producto.nombre
        templateProductos.querySelectorAll('td')[0].textContent = producto.cantidad
        templateProductos.querySelector('span').textContent = producto.cantidad * producto.precio

        const clonar = templateProductos.cloneNode(true)
        fragment.appendChild(clonar)
    })
    addProductos.appendChild(fragment)
    mostrarTotal()
}

const mostrarTotal = () => {
    footerPro.innerHTML = ''
    if (Object.keys(arrayProductos).length === 0) {
        footerPro.innerHTML = `<th>Agregue productos!</th>`
    }

    const nCantidad = Object.values(arrayProductos).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(arrayProductos).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)

    templateTotal.querySelectorAll('td')[0].textContent = nCantidad
    templateTotal.querySelector('span').textContent = nPrecio

    const clonar = templateTotal.cloneNode(true)
    fragment.appendChild(clonar)
    footerPro.appendChild(fragment)
}


btnGuardar.addEventListener("click", function() {

    if (identificacion.value.length === 0 || cliente.value.length === 0) return;

    var cotizaciones = {
        identificacion: identificacion.value,
        cliente: cliente.value,
        productos: Object.values(arrayProductos)
    }

    identificacion.value = '';
    cliente.value = '';
    productos.value = '';

    console.log(cotizaciones)
    agregaraLocalStorage(cotizaciones);
    removeEditar()
    swal({
        text: "Cotizacion agregada satisfactoriamente",
        icon: "success",
    });

    if (Object.keys(arrayProductos).length != 0) {
        arrayProductos = {}
        addProductos.innerHTML = ''
        footerPro.innerHTML = `<th>Agregue productos!</th>`

    }
});

function agregaraLocalStorage(obj) {
    var cotizaciones = [];
    var dataLocalStorage = localStorage.getItem(localCotizaciones);

    if (dataLocalStorage !== null) {
        cotizaciones = JSON.parse(dataLocalStorage);
    }

    cotizaciones.push(obj);

    localStorage.setItem(localCotizaciones, JSON.stringify(cotizaciones));
}



if (sessionStorage.getItem(sessionStorageKeyNameEditarCotizaciones) !== null) {
    cargardato();
}

function cargardato() {

    var datos = sessionStorage.getItem(sessionStorageKeyNameEditarCotizaciones);
    cotizacionEditar = JSON.parse(datos);

    identificacion.value = cotizacionEditar.identificacion;
    cliente.value = cotizacionEditar.cliente;

    console.log(cotizacionEditar.productos)

    cotizacionEditar.productos.forEach(function(objeto) {


        const producto = {
            nombre: objeto.nombre,
            cantidad: parseInt(objeto.cantidad),
            precio: objeto.precio
        }
        productos.value = ''
        cantProductos.value = ''


        // console.log(arrayProductos)
        if (arrayProductos.hasOwnProperty(producto.nombre)) {
            producto.cantidad += arrayProductos[producto.nombre].cantidad
        }

        arrayProductos[producto.nombre] = {...producto }
        console.log(arrayProductos)

        if (producto.cantidad <= 0) {
            delete arrayProductos[producto.nombre]
        }
        mostrarProducto()

    })

}

function removeEditar() {

    sessionStorage.removeItem(sessionStorageKeyNameEditarCotizaciones);

}

btnImprimir.addEventListener("click", function() {
    console.log('hi')
    window.print();
});