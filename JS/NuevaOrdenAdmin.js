var identificacion = document.getElementById('identificacion')
var cliente = document.getElementById('cliente')
var responsable = document.getElementById('responsable')
var metodoPago = document.getElementById('metododepago')
var productos = document.getElementById("productos")
var cantProductos = document.querySelector('#numero')
var agregarProductos = document.querySelector('#agregar-producto')
var estado = document.getElementById('estado')
var fecha = document.getElementById('fecha')
var btnGuardar = document.querySelector("#btn-Guardar")
const addProductos = document.querySelector('#productos-list')
const footerPro = document.getElementById('footer-pro')
const templateTotal = document.querySelector('#template-total').content
const templateProductos = document.querySelector('#template-productos').content
const fragment = document.createDocumentFragment()

var sessionStorageKeyNameEditarOrdenTrabajo = 'editarordentrabajo';

var localOrdenTabajo = 'OrdenesDeTrabajo'
var localOrdenTabajoAlmacenar = 'ordentrabajoalmacenar';
var localProductos = 'productos';
var datos = localStorage.getItem(localProductos);
let arrayProductos = {}

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


    if (arrayProductos.hasOwnProperty(producto.nombre)) {
        producto.cantidad += arrayProductos[producto.nombre].cantidad
    }

    arrayProductos[producto.nombre] = {...producto }
        // console.log(arrayProductos)

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

    if (identificacion.value.length === 0 || cliente.value.length === 0 || responsable.value.length === 0 || metodoPago.value.length === 0 || fecha.value.length === 0) return;

    var ordenTrabajo = {
        identificacion: identificacion.value,
        cliente: cliente.value,
        responsable: responsable.value,
        metodoPago: metodoPago.value,
        productos: Object.values(arrayProductos),
        estado: estado.value,
        fecha: fecha.value
    }

    identificacion.value = '';
    cliente.value = '';
    responsable.value = '';
    metodoPago.value = '';
    productos.value = '';
    estado.value = '';
    fecha.value = '';

    console.log(ordenTrabajo)
    agregaraLocalStorage(ordenTrabajo);
    almacenar(ordenTrabajo);
    removeEditar()

    swal({
        text: "Orden de trabajo agregada satisfactoriamente",
        icon: "success",
    });

    if (Object.keys(arrayProductos).length != 0) {
        arrayProductos = {}
        addProductos.innerHTML = ''
        footerPro.innerHTML = `<th>Agregue productos!</th>`
    }
});

function agregaraLocalStorage(obj) {
    var ordenTrabajo = [];
    var dataLocalStorage = localStorage.getItem(localOrdenTabajo);

    if (dataLocalStorage !== null) {
        ordenTrabajo = JSON.parse(dataLocalStorage);
    }

    ordenTrabajo.push(obj);

    localStorage.setItem(localOrdenTabajo, JSON.stringify(ordenTrabajo));
}

function almacenar(obj) {
    var ordenTrabajo = [];
    var dataLocalStorage = localStorage.getItem(localOrdenTabajoAlmacenar);

    if (dataLocalStorage !== null) {
        ordenTrabajo = JSON.parse(dataLocalStorage);
    }

    ordenTrabajo.push(obj);

    localStorage.setItem(localOrdenTabajoAlmacenar, JSON.stringify(ordenTrabajo));
}

if (sessionStorage.getItem(sessionStorageKeyNameEditarOrdenTrabajo) !== null) {
    cargardato();
}

function cargardato() {

    var datos = sessionStorage.getItem(sessionStorageKeyNameEditarOrdenTrabajo);
    cotizacionEditar = JSON.parse(datos);

    cliente.value = cotizacionEditar.cliente;
    estado.value = cotizacionEditar.estado;
    fecha.value = cotizacionEditar.fecha;
    identificacion.value = cotizacionEditar.identificacion;
    metodoPago.value = cotizacionEditar.metodoPago;
    responsable.value = cotizacionEditar.responsable;


    console.log(cotizacionEditar.productos)

    cotizacionEditar.productos.forEach(function(objeto) {
        const producto = {
            cantidad: parseInt(objeto.cantidad),
            nombre: objeto.nombre,
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

    sessionStorage.removeItem(sessionStorageKeyNameEditarOrdenTrabajo);

}