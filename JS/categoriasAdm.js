var localStorageKeyNameCategorias = 'Categorias';
var sessionStorageKeyNameEditarCategoria = 'editarCategoria';

var tabla = document.querySelector("#tablaCategorias tbody");
var buscador = document.getElementById("buscar");

categoriasLocalStorage();

function categoriasLocalStorage() {
    //var tabla = document.querySelector("#tablaCategorias tbody");
    var categorias = [];
    var datos = localStorage.getItem(localStorageKeyNameCategorias);

    if (datos !== null) {
        categorias = JSON.parse(datos);
    }

    tabla.innerHTML = '';

    categorias.forEach(function(x, i) {

        var tr = document.createElement("tr"),

            tdIdentificacion = document.createElement("td"),
            tdNombre = document.createElement("td"),
            tdOpciones = document.createElement("td"),
            btnEliminar = document.createElement("a");
        btnEditar = document.createElement("a");

        tdIdentificacion.className = 'col';
        tdIdentificacion.innerHTML = x.identificacion;
        tdNombre.innerHTML = x.nombre;

        //editar
        btnEditar.className = "fas fa-sync-alt";
        btnEditar.style.cursor = 'pointer';
        btnEditar.addEventListener('click', function() {
            editar(i, categorias);
            removeFromLocalStorage(i);
        });
        tdOpciones.appendChild(btnEditar);

        //eliminar
        btnEliminar.className = "far fa-trash-alt";
        btnEliminar.style.cursor = 'pointer';
        btnEliminar.addEventListener('click', function() {
            removeFromLocalStorage(i);
        });
        tdOpciones.appendChild(btnEliminar);

        tr.appendChild(tdIdentificacion);
        tr.appendChild(tdNombre);
        tr.appendChild(tdOpciones);

        tabla.appendChild(tr);
    });
}

const filtrar = () => {
    var datos = localStorage.getItem(localStorageKeyNameCategorias);
    var clientes = [];
    clientes = JSON.parse(datos);
    tabla.innerHTML = '';
    const texto = buscador.value.toLowerCase();
    clientes.forEach(function(x, i) {
        let nombres = x.nombre.toLowerCase();
        if (nombres.indexOf(texto) !== -1) {

            var tr = document.createElement("tr"),

                tdIdentificacion = document.createElement("td"),
                tdNombre = document.createElement("td"),
                tdOpciones = document.createElement("td"),
                btnEliminar = document.createElement("a");
            btnEditar = document.createElement("a");

            tdIdentificacion.className = 'col';
            tdIdentificacion.innerHTML = x.identificacion;
            tdNombre.innerHTML = x.nombre;

            //editar
            btnEditar.className = "fas fa-sync-alt";
            btnEditar.style.cursor = 'pointer';
            btnEditar.addEventListener('click', function() {
                editar(i, categorias);
                removeFromLocalStorage(i);
            });
            tdOpciones.appendChild(btnEditar);

            //eliminar
            btnEliminar.className = "far fa-trash-alt";
            btnEliminar.style.cursor = 'pointer';
            btnEliminar.addEventListener('click', function() {
                removeFromLocalStorage(i);
            });
            tdOpciones.appendChild(btnEliminar);

            tr.appendChild(tdIdentificacion);
            tr.appendChild(tdNombre);
            tr.appendChild(tdOpciones);

            tabla.appendChild(tr);

        }
    });

    if (tabla.innerHTML === '') {
        tabla.innerHTML += `<p>Categoria no encontrada</p>`
    }
}

buscador.addEventListener('keyup', filtrar);

function editar(id, categorias) {

    sessionStorage.setItem(sessionStorageKeyNameEditarCategoria, JSON.stringify(categorias[id]));

    location.href = "./NuevaCategoria.html"

}

function removeFromLocalStorage(index) {
    var clientes = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyNameCategorias);

    clientes = JSON.parse(dataInLocalStorage);

    clientes.splice(index, 1);

    localStorage.setItem(localStorageKeyNameCategorias, JSON.stringify(clientes));
    categoriasLocalStorage();
}