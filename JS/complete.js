var localProductos = 'productos';
var productos = localStorage.getItem(localProductos);

const productosItems = document.querySelector('.productos_item');
const templateProductos = document.querySelector('#template-producto').content;
const fragment = document.createDocumentFragment();
const buscador = document.querySelector('#buscador');

// Body

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
})

productosItems.addEventListener('click', e => {
    //gestionarProductos(e);
})

function cargarProductos() {

    var productos = localStorage.getItem(localProductos);
    datos = JSON.parse(productos);

    bandera = false;

    datos.forEach(producto => {
        console.log(producto)
        console.log(producto.cantInicial + ':' + producto.cantMinima + ':' + producto.nombre)
        var a = parseInt(producto.cantInicial);
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
    templateProductos.querySelector('#cantidad').textContent = producto.cantInicial;
    templateProductos.querySelector('.agregar-producto').dataset.id = producto.codigo;

    const clonar = templateProductos.cloneNode(true);
    fragment.appendChild(clonar);

    productosItems.appendChild(fragment);
}