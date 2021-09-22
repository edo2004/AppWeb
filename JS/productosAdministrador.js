var localProductos = 'productos';
var localProductosAlmacenar = 'productosalmacenar';
var clientes = [];
var datos = localStorage.getItem(localProductos);
var sessionStorageKeyNameEditarProductos = 'editarproductos';
const productosItems = document.querySelector('.productos_item');
const templateProductos = document.querySelector('#template-producto').content;
const fragment = document.createDocumentFragment();
const buscador = document.querySelector('#buscador');


document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
})

productosItems.addEventListener('click', e => {
    gestionarProductos(e);
})


function cargarProductos() {

    if (datos !== null) {
        clientes = JSON.parse(datos);
    }

    // clientes.splice(3, 1);
    // localStorage.setItem(localProductos, JSON.stringify(clientes));
    pintarProducto(clientes)
        // console.log(clientes);
}
const pintarProducto = clientes => {
    productosItems.innerHTML = '';
    clientes.forEach(producto => {

        templateProductos.querySelector('#tituloProducto').textContent = producto.nombre;
        templateProductos.querySelector('.img-producto').setAttribute("src", producto.imageUrl);
        templateProductos.querySelector('.img-producto').setAttribute("id", producto.codigo);
        templateProductos.querySelector('.agregar-producto').dataset.id = producto.codigo;
        templateProductos.querySelector('.eliminar-producto').dataset.id = producto.codigo;
        templateProductos.querySelector('.modificar-producto').dataset.id = producto.codigo;

        const clonar = templateProductos.cloneNode(true);
        fragment.appendChild(clonar);
    })
    productosItems.appendChild(fragment);
}

const filtrar = () => {
    var clientes = [];
    clientes = JSON.parse(datos);
    productosItems.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    clientes.forEach(function(producto, i) {
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

const gestionarProductos = e => {
    const producto = e.target.parentElement
    console.log(producto)
    const agregar = producto.querySelector('.agregar-producto').dataset.id
    const eliminar = producto.querySelector('.eliminar-producto').dataset.id
    const modificar = producto.querySelector('.modificar-producto').dataset.id
    var clientes = [];
    var datos = localStorage.getItem(localProductos);
    if (datos !== null) {
        clientes = JSON.parse(datos);
    }
    clientes.forEach(function(producto, i) {

        if (e.target.classList.contains('agregar-producto')) {
            if (producto.codigo == agregar) {
                agregarProducto(i)
                console.log(i)
            }
        }
        if (e.target.classList.contains('eliminar-producto')) {
            if (producto.codigo == eliminar) {
                eliminarProducto(i)
            }
        }
        if (e.target.classList.contains('modificar-producto')) {
            if (producto.codigo == modificar) {
                eliminarProductoAlmacenado(i)
                modificarProducto(clientes, i)
                eliminarProducto(i)
            }
        }
    })

    // e.stopPropagation()
}

function agregarProducto(index) {
    var clientes = []
    var datos = localStorage.getItem(localProductos);
    clientes = JSON.parse(datos);

    swal(`Cuant@s ${clientes[index].nombre}s desea agregar ? `, {
        content: "input",
        buttons: {
            cancel: true,
            confirm: {
                text: "Agregar"
              }
          },
      })
      .then((agregar) => {

        if(agregar){
            // console.log(clientes[index])
            producto = {
                ...clientes[index],
                unidad: parseInt(clientes[index].unidad) + parseInt(agregar)
            }
            // console.log(producto)
            clientes.splice(index, 1, producto);
         
            localStorage.setItem(localProductos, JSON.stringify(clientes));
            swal({
                text: "Producto agregado satisfactoriamente!",
                icon: "success",
            });
            pintarProducto(clientes)
        }else{
            swal({
                text: "Producto no agregado!",
                icon: "error",
                });
        }
        
        
        
        
      });   

}

function eliminarProducto(index) {
    var clientes = []
    var datos = localStorage.getItem(localProductos);
    clientes = JSON.parse(datos);
    console.log(clientes[index].nombre)
    clientes.splice(index, 1);
    localStorage.setItem(localProductos, JSON.stringify(clientes));

    swal({
        text: "Producto eliminado satisfactoriamente!",
        icon: "success",
    });

    pintarProducto(clientes)
}

function eliminarProductoAlmacenado(index){
    var clientes = []
    var datos = localStorage.getItem(localProductos);
    clientes = JSON.parse(datos);
    console.log(clientes[index].nombre)
    localStorage.setItem(localProductos, JSON.stringify(clientes));

    var productos = [];
    var dataProductos = localStorage.getItem(localProductosAlmacenar);

    if (dataProductos !== null) {
        productos = JSON.parse(dataProductos);
    }
    
    productos.forEach(function(producto,j){
        if(producto.nombre == clientes[index].nombre){
            productos.splice(j, 1);
            localStorage.setItem(localProductosAlmacenar, JSON.stringify(productos));
        }
    })
}

function modificarProducto(producto, i) {
    sessionStorage.setItem(sessionStorageKeyNameEditarProductos, JSON.stringify(producto[i]));
    location.href = "./productosAdmin.html"
}


function myf(data) {
    var modal = document.getElementById("myModal");
    var span = document.querySelector(".close-modal");
    modal.style.display = "block";

    var Url = data.src;
    var codigo = data.id;
    mostrarDatos(codigo);

    document.querySelector('.img-imagen').setAttribute("src", Url);

    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
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

    productos.forEach(function(x, i) {

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
                fecha = document.createElement('p');

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
            fecha.innerHTML = 'Fecha: ' + x.fecha;


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
            datos.appendChild(fecha);

            cargardatos.appendChild(datos);
        }


    });
}
