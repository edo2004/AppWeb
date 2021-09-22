var localStorageKeyNameCategorias = 'Categorias';
var sessionStorageKeyNameEditarCategoria = 'editarCategoria';

var identificacion = document.getElementById("identificacion");
var nombre = document.getElementById("nombre");

if (sessionStorage.getItem(sessionStorageKeyNameEditarCategoria) !== null) {

    cargardato();
}

function cargardato() {

    var datos = sessionStorage.getItem(sessionStorageKeyNameEditarCategoria);
    categoriaEditar = JSON.parse(datos);

    identificacion.value = categoriaEditar.identificacion;
    nombre.value = categoriaEditar.nombre;

}

document.querySelector("#btn-guardar").addEventListener("click", function () {


    if (identificacion.value.length === 0 || nombre.value.length === 0) return;

    var categoria = {
        identificacion: identificacion.value,
        nombre: nombre.value
    }

    identificacion.value = '';
    nombre.value = '';

    agregaraLocalStorage(categoria);
    removeEditar();

    swal({
        text: "Categoría agregada satisfactoriamente",
        icon: "success",
      });
});


function agregaraLocalStorage(obj) {
    var categorias = [];
    var dataLocalStorage = localStorage.getItem(localStorageKeyNameCategorias);

    if (dataLocalStorage !== null) {
        categorias = JSON.parse(dataLocalStorage);
    }

    categorias.push(obj);

    localStorage.setItem(localStorageKeyNameCategorias, JSON.stringify(categorias));
}

function removeEditar() {

    sessionStorage.removeItem(sessionStorageKeyNameEditarCategoria);

}