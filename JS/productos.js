var localProductos = 'productos';
var clientes = [];
var datos = localStorage.getItem(localProductos);
const productosItems = document.querySelector('.productos_item');
const templateProductos = document.querySelector('#template-producto').content;
const fragment = document.createDocumentFragment();

const buscador = document.querySelector('#search');

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
})

function cargarProductos() {


    if (datos !== null) {
        clientes = JSON.parse(datos);
    }
    // clientes.splice(2, 1);
    // localStorage.setItem(localProductos, JSON.stringify(clientes));
    pintarProducto(clientes)
    // console.log(clientes);
}
const pintarProducto = clientes => {
    clientes.forEach(producto => {

        templateProductos.querySelector('#tituloProducto').textContent = producto.nombre;
        templateProductos.querySelector('.img-producto').setAttribute("src", producto.imageUrl);

        templateProductos.querySelector('.img-producto').setAttribute("id", producto.codigo);

        const clonar = templateProductos.cloneNode(true);
        fragment.appendChild(clonar);
    })
    productosItems.appendChild(fragment);
}

const filtrar = () => {
    var datos = localStorage.getItem(localProductos);
    var clientes = [];
    clientes = JSON.parse(datos);
    productosItems.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    clientes.forEach(function (producto, i) {
        let nombres = producto.nombre.toLowerCase();
        if (nombres.indexOf(texto) !== -1) {

            templateProductos.querySelector('#tituloProducto').textContent = producto.nombre;
            templateProductos.querySelector('.img-producto').setAttribute("src", producto.imageUrl);
            templateProductos.querySelector('.img-producto').setAttribute("id", producto.codigo);

            const clonar = templateProductos.cloneNode(true);
            fragment.appendChild(clonar);
        }
        productosItems.appendChild(fragment);
    });
    if (productosItems.innerHTML === '') {
        productosItems.innerHTML += `<p>Cliente no encontrado</p>`

    }
}

buscador.addEventListener('keyup', filtrar);

function myf(data) {
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.querySelector(".close-modal");
    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    var Url = data.src;
    var codigo = data.id;
    console.log(codigo);
    mostrarDatos(codigo);

    document.querySelector('.img-imagen').setAttribute("src", Url);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function mostrarDatos(id) {

    var productos = [];
    var dat = localStorage.getItem(localProductos);
    var cargardatos = document.getElementById("datosProducto");
    var nombrePro = document.getElementById('nombre-producto')

    if (dat !== null) {
        productos = JSON.parse(dat);
    }
    cargardatos.innerHTML = '';

    productos.forEach(function (x, i) {

        if (id === x.codigo) {

            //titulo del modal--- nombre del producto
            nombrePro.innerText = x.nombre;

            var datos = document.createElement("p"),
                pIdentificacion = document.createElement("p"),
                pNombre = document.createElement("p"),
                pProveedor = document.createElement("p"),
                cantInicial = document.createElement("p"),
                cantiMinima = document.createElement("p"),
                cat = document.createElement("p"),
                descripcion = document.createElement("p"),
                pEntrada = document.createElement("p"),
                pSalida = document.createElement("p"),
                presentacion = document.createElement("p"),
                ubic = document.createElement("p"),
                unidad = document.createElement("p"),
                pfecha = document.createElement("p");

            pIdentificacion.innerHTML = ' Codigo: ' + x.codigo;
            pNombre.innerHTML = ' Nombre: ' + x.nombre;
            pProveedor.innerHTML = ' Proveedor: ' + x.proveedor;
            cantInicial.innerHTML = ' Cantidad Inicial: ' + x.cantInicial;
            cantiMinima.innerHTML = ' Cantidad Minima: ' + x.cantMinima;
            cat.innerHTML = ' Categoria: ' + x.cat;
            descripcion.innerHTML = ' Descripción: ' + x.descripcion;
            pEntrada.innerHTML = ' Precio de Entrada: ' + x.pEntrada;
            pSalida.innerHTML = ' Precio de Salida: ' + x.pSalida;
            presentacion.innerHTML = ' Presentación: ' + x.presentacion;
            ubic.innerHTML = ' Ubicación: ' + x.ubic;
            unidad.innerHTML = ' Unidad: ' + x.unidad;
            pfecha.innerHTML = ' Fecha Compra: ' + x.fecha;


            datos.appendChild(pIdentificacion);
            datos.appendChild(pNombre);
            datos.appendChild(pProveedor);
            datos.appendChild(cantInicial);
            datos.appendChild(cantiMinima);
            datos.appendChild(cat);
            datos.appendChild(descripcion);
            datos.appendChild(pEntrada);
            datos.appendChild(pSalida);
            datos.appendChild(presentacion);
            datos.appendChild(ubic);
            datos.appendChild(unidad);
            datos.appendChild(pfecha);

            cargardatos.appendChild(datos);
        }


    });
}


