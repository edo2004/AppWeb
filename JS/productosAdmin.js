var localProductos = 'productos';
var localProductosAlmacenar = 'productosalmacenar';
var localStorageKeyNameCategorias = 'Categorias';
var localStorageKeyNameProveedores = 'proveedores';
var sessionStorageKeyNameEditarProductos = 'editarproductos';

var codigo = document.querySelector("#codigo");
var nombre = document.querySelector("#nombre");
var proveedor = document.querySelector("#proveedor");
var categoria = document.querySelector("#cat");
var ubicacion = document.querySelector("#ubic");
var descripcion = document.querySelector("#descripcion");
var pEntrada = document.querySelector("#pEntrada");
var pSalida = document.querySelector("#pSalida");
var unidad = document.querySelector("#unidad");
var presentacion = document.querySelector("#presentacion");
var cantInicial = document.querySelector("#cantInicial");
var cantMinima = document.querySelector("#cantMinima");
var fecha = document.querySelector("#fecha");

const inpFile = document.querySelector("#image");
const preview = document.querySelector(".image-preview");
const btnGuardar = document.querySelector(".guardar");
let formData = new FormData();
const apiKey = '5113f381b71ec280646070e83458d351';
//const apiKey = 'e4022e7c6797c820f1604429a3c0cbca';
const PORCENTAJE = 20;
pEntrada.addEventListener('keyup', function(){
    pSalida.value = Math.round(pEntrada.value*(1+(PORCENTAJE/100))) 
})


if (sessionStorage.getItem(sessionStorageKeyNameEditarProductos) !== null) {
    cargardato();
}

function cargardato() {

    var datos = sessionStorage.getItem(sessionStorageKeyNameEditarProductos);
    productoEditar = JSON.parse(datos);

    codigo.value = productoEditar.codigo;
    nombre.value = productoEditar.nombre;
    proveedor.value = productoEditar.proveedor;
    cat.value = productoEditar.cat;

    ubic.value = productoEditar.ubic;
    descripcion.value = productoEditar.descripcion;
    pEntrada.value = productoEditar.pEntrada;
    pSalida.value = productoEditar.pSalida;
    unidad.value = productoEditar.unidad;
    presentacion.value = productoEditar.presentacion;
    cantInicial.value = productoEditar.cantInicial;
    cantMinima.value = productoEditar.cantMinima;
    fecha.value = productoEditar.fecha;
}

mostrarCategorias();
mostrarProveedores();

function mostrarCategorias() {

    var categorias = [];
    var dat = localStorage.getItem(localStorageKeyNameCategorias);
    var cargardatos = document.getElementById("cat");

    if (dat !== null) {
        categorias = JSON.parse(dat);
    }
    cargardatos.innerHTML = '';

    categorias.forEach(function(x, i) {

        var datos = document.createElement("option"),
            pNombre = document.createElement("option");

        pNombre.innerHTML = x.nombre;

        datos.appendChild(pNombre);

        cargardatos.appendChild(datos);
    });
}

function mostrarProveedores() {

    var proveedores = [];
    var dat = localStorage.getItem(localStorageKeyNameProveedores);
    var cargardatos = document.getElementById("proveedor");

    if (dat !== null) {
        proveedores = JSON.parse(dat);
    }
    cargardatos.innerHTML = '';

    proveedores.forEach(function(x, i) {

        var datos = document.createElement("option"),
            pNombre = document.createElement("option");

        pNombre.innerHTML = x.nombre + ' ' + x.apellido;

        datos.appendChild(pNombre);

        cargardatos.appendChild(datos);
    });
}

inpFile.addEventListener("change", function() {
    const file = this.files[0];
    const fileType = this.files[0].type;
    const image = new Image(250, 300);
    formData.append('image', file, file.name);
    formData.append('name', file.name);

    if (file) {
        if (fileType == 'image/jpeg' || fileType == 'image/png') {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                image.src = result;
                preview.innerHTML = '';
                preview.append(image);
            }
            reader.readAsDataURL(file);
        }
    }

})

btnGuardar.addEventListener("click", async() => {

    // if(codigo.value.length === 0 || nombre.value.length === 0 || cat.value.length === 0 || ubic.value.length === 0 || descripcion.value.length === 0 || !parseInt(pEntrada.value) || !parseInt(pSalida.value) || !parseInt(unidad.value) || presentacion.value.length === 0 || !parseInt(cantInicial.value) || !parseInt(cantMinima.value) || fecha.value.length ===0 ) return;

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    let producto = {

        codigo: codigo.value,
        nombre: nombre.value,
        proveedor: proveedor.value,
        cat: cat.value,
        ubic: ubic.value,
        descripcion: descripcion.value,
        pEntrada: pEntrada.value,
        pSalida: pSalida.value,
        unidad: unidad.value,
        presentacion: presentacion.value,
        cantInicial: cantInicial.value,
        cantMinima: cantMinima.value,
        fecha: fecha.value,
        imageUrl: data.data.display_url

    }

    codigo.value = '';
    nombre.value = '';
    //proveedor.value = '';
    //cat.value = '';
    //ubic.value = '';
    descripcion.value = '';
    pEntrada.value = '';
    pSalida.value = '';
    unidad.value = '';
    presentacion.value = '';
    cantInicial.value = '';
    cantMinima.value = '';
    fecha.value = '';
    image.value = '';
    preview.innerHTML = '';

    agregaraLocalStorage(producto);
    almacenar(producto);
    removeEditar();
    swal({
        text: "Producto agregado satisfactoriamente!",
        icon: "success",
      });
});

function removeEditar() {

    sessionStorage.removeItem(sessionStorageKeyNameEditarProductos);

}


function agregaraLocalStorage(obj) {
    var productos = [];
    var dataProductos = localStorage.getItem(localProductos);

    if (dataProductos !== null) {
        productos = JSON.parse(dataProductos);
    }

    productos.push(obj);

    localStorage.setItem(localProductos, JSON.stringify(productos));
}

function almacenar(obj) {
    var productos = [];
    var dataProductos = localStorage.getItem(localProductosAlmacenar);

    if (dataProductos !== null) {
        productos = JSON.parse(dataProductos);
    }
    productos.push(obj);
    localStorage.setItem(localProductosAlmacenar, JSON.stringify(productos));
}