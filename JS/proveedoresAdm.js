var localStorageKeyNameProveedores = 'proveedores';
var sessionStorageKeyNameEditarProveedores = 'editarproveedores';
var localProductos = 'productos';
var localProductosAlmacenar = 'productosalmacenar';

var buscador = document.getElementById("buscar");
var tabla = document.querySelector("#tablaproveedores tbody");

proveedoresLocalStorage();

function proveedoresLocalStorage() {

    var clientes = [];
    var datos = localStorage.getItem(localStorageKeyNameProveedores);

    if (datos !== null) {
        clientes = JSON.parse(datos);
    }

    tabla.innerHTML = '';

    clientes.forEach(function(x, i) {

        var tr = document.createElement("tr"),

            tdIdentificacion = document.createElement("td"),
            tdNombre = document.createElement("td"),
            tdApellido = document.createElement("td"),
            tdDirección = document.createElement("td"),
            tdEmail = document.createElement("td"),
            tdTeléfono = document.createElement("td"),
            tdCompras = document.createElement("td"),
            btnCompras = document.createElement("a"),
            tdOpciones = document.createElement("td"),
            btnEliminar = document.createElement("a"),
            btnEditar = document.createElement("a");

        tdIdentificacion.className = 'col';
        tdIdentificacion.innerHTML = x.identificacion;
        tdNombre.innerHTML = x.nombre;
        tdApellido.innerHTML = x.apellido;
        tdDirección.innerHTML = x.direccion;
        tdEmail.innerHTML = x.email;
        tdTeléfono.innerHTML = x.telefono;

        //compras
        btnCompras.textContent = 'ver';
        btnCompras.style.cursor = 'pointer';
        btnCompras.className.cursor = 'pointer';
        btnCompras.addEventListener('click', function() {
            compras(x.nombre + ' ' + x.apellido);
        });
        tdCompras.appendChild(btnCompras);


        //editar
        btnEditar.className = "fas fa-sync-alt";
        btnEditar.style.cursor = 'pointer';
        btnEditar.addEventListener('click', function() {
            editar(i, clientes);
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
        tr.appendChild(tdApellido);
        tr.appendChild(tdDirección);
        tr.appendChild(tdDirección);
        tr.appendChild(tdEmail);
        tr.appendChild(tdTeléfono);
        tr.appendChild(tdCompras);
        tr.appendChild(tdOpciones);

        tabla.appendChild(tr);

    });
}

function compras(nombre) {
    var productos = [];
    var dat = localStorage.getItem(localProductosAlmacenar);

    var bandera = false;
    if (dat !== null) {
        productos = JSON.parse(dat);
    }

    productos.forEach(function(x, i) {
        if (x.proveedor == nombre) {
            myf(nombre)
            bandera = true;
        }
    });

    if (bandera === false) {
        swal({
            text: "Ninguna compra asociada a este proveedor",
            button: "Aceptar"
        });
    }
}


function myf(codigo) {
    var modal = document.getElementById("myModal");
    var span = document.querySelector(".close-modal");
    modal.style.display = "block";

    mostrarDatos(codigo);

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
    var dat = localStorage.getItem(localProductosAlmacenar);
    var cargardatos = document.getElementById("datosProducto");
    var nombrePro = document.getElementById('nombre-producto')

    if (dat !== null) {
        productos = JSON.parse(dat);
    }
    cargardatos.innerHTML = '';

    productos.forEach(function(x, i) {

        if (id === x.proveedor) {

            nombrePro.innerText = x.proveedor;

            var datos = document.createElement("div"),
                pIdentificacion = document.createElement("p"),
                pNombre = document.createElement("p"),
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
            datos.classList.add("item-compra")

            cargardatos.appendChild(datos);
            cargardatos.className = 'mostrarModal';

        }
    });
}


const filtrar = () => {
    var datos = localStorage.getItem(localStorageKeyNameProveedores);
    var clientes = [];
    clientes = JSON.parse(datos);
    tabla.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    // for (let producto of clientes) {
    clientes.forEach(function(producto, i) {
        let nombres = producto.nombre.toLowerCase();

        if (nombres.indexOf(texto) !== -1) {

            var tr = document.createElement("tr"),
                tdIdentificacion = document.createElement("td"),
                tdNombre = document.createElement("td"),
                tdApellido = document.createElement("td"),
                tdDirección = document.createElement("td"),
                tdEmail = document.createElement("td"),
                tdTeléfono = document.createElement("td"),
                tdCompras = document.createElement("td"),
                btnCompras = document.createElement("a"),
                tdOpciones = document.createElement("td"),
                btnEliminar = document.createElement("a");
            btnEditar = document.createElement("a");

            tdIdentificacion.className = 'col';
            tdIdentificacion.innerHTML = producto.identificacion;
            tdNombre.innerHTML = producto.nombre;
            tdApellido.innerHTML = producto.apellido;
            tdDirección.innerHTML = producto.direccion;
            tdEmail.innerHTML = producto.email;
            tdTeléfono.innerHTML = producto.telefono;

            //compras
            btnCompras.textContent = 'ver';
            btnCompras.style.cursor = 'pointer';
            btnCompras.addEventListener('click', function() {
                compras(producto.nombre + ' ' + producto.apellido);
            });
            tdCompras.appendChild(btnCompras);

            //editar
            btnEditar.className = "fas fa-sync-alt";
            btnEditar.style.cursor = 'pointer';
            btnEditar.addEventListener('click', function() {
                editar(i, clientes);
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
            tr.appendChild(tdApellido);
            tr.appendChild(tdDirección);
            tr.appendChild(tdDirección);
            tr.appendChild(tdEmail);
            tr.appendChild(tdTeléfono);
            tr.appendChild(tdCompras);
            tr.appendChild(tdOpciones);

            tabla.appendChild(tr);
        }
    });

    if (tabla.innerHTML === '') {
        tabla.innerHTML += `<p>Proveedor no encontrado</p>`
    }
}

buscador.addEventListener('keyup', filtrar);

function editar(id, cliente) {

    sessionStorage.setItem(sessionStorageKeyNameEditarProveedores, JSON.stringify(cliente[id]));
    location.href = "./proveedoresAdmin.html"

}


function removeFromLocalStorage(index) {
    var clientes = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyNameProveedores);

    clientes = JSON.parse(dataInLocalStorage);

    clientes.splice(index, 1);

    localStorage.setItem(localStorageKeyNameProveedores, JSON.stringify(clientes));
    proveedoresLocalStorage();
}