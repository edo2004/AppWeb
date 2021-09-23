var localProductos = 'productos';
localClientes = 'clientes';
localProveedores = 'proveedores'
localCategorias = 'Categorias'
var productos = localStorage.getItem(localProductos);

const productosItems = document.querySelector('.productos_item');
const templateProductos = document.querySelector('#template-producto').content;
const fragment = document.createDocumentFragment();
const buscador = document.querySelector('#buscador');

const numeroClientes = document.querySelector('#numero-clientes')
const numeroProveedores = document.querySelector('#numero-proveedores')
const numeroProductos = document.querySelector('#numero-productos')
const numeroCategorias = document.querySelector('#numero-categorias')

// Body

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarDatosInfo();
})

productosItems.addEventListener('click', e => {
    //gestionarProductos(e);
})

function cargarDatosInfo() {

    // numero clientes
    var clientes = [];
    var datosClientes = localStorage.getItem(localClientes)
    if(datosClientes != null){
        clientes = JSON.parse(datosClientes);
    }
    numeroClientes.innerText = 
    `Los clientes nos prefieren, tanto así que ${clientes.length} adquieren nuestros productos a muy bajo costo. Que esperas para adquirir nuestros productos !`

    // numero proveedores
    var proveedores = [];
    var datosProveedores = localStorage.getItem(localProveedores)
    if(datosProveedores != null){
        proveedores = JSON.parse(datosProveedores);
    }
    numeroProveedores.innerText = 
    `Aquirimos nuestros productos de las mejores marcas para ti. ${proveedores.length} empresas trabajan con nosotros`

    // numero productos
    var productos = [];
    var datosProductos = localStorage.getItem(localProductos)
    if(datosProductos != null){
        productos = JSON.parse(datosProductos);
    }
    numeroProductos.innerText = 
    `Tenemos ${productos.length} productos para ti, de la mejor calidad para que no dudes en llevarlos a tu hogar`

    // numero categorias
    var categorias = [];
    var datosCategorias = localStorage.getItem(localCategorias)
    if(datosCategorias != null){
        categorias = JSON.parse(datosCategorias);
    }
    numeroCategorias.innerText = 
    `Manejamos variedad de productos. En este momento tenemos ${categorias.length} categorias en las cales puedes elegir el producto que desees`
}

function cargarProductos() {

    var productos = localStorage.getItem(localProductos);
    datos = JSON.parse(productos);

    bandera = false;

    datos.forEach(producto => {
        var a = parseInt(producto.unidad);
        var b = parseInt(producto.cantMinima);
        if (a <= b) {
            console.log(producto.nombre)
            pintarProducto(producto);
            bandera = true;
        }
    });

    if (bandera == false) {
        productosItems.innerHTML = '';
        productosItems.innerHTML += `<p>No hay productos por terminarse</p>`
    }

}
const pintarProducto = producto => {
    // productosItems.innerHTML = '';

    templateProductos.querySelector('#tituloProducto').textContent = producto.nombre;
    templateProductos.querySelector('.img-producto').setAttribute("src", producto.imageUrl);
    templateProductos.querySelector('.img-producto').setAttribute("id", producto.codigo);
    templateProductos.querySelector('#cantidad').textContent = producto.unidad;
    templateProductos.querySelector('.agregar-producto').dataset.id = producto.codigo;

    const clonar = templateProductos.cloneNode(true);
    fragment.appendChild(clonar);

    productosItems.appendChild(fragment);
}