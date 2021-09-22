var localStorageKeyName = 'clientes';
var sessionStorageKeyNameEditar = 'editar';
var localCotizaciones = 'cotizaciones';
var localOrdenTabajo = 'OrdenesDeTrabajo'


var buscador = document.getElementById("buscar");
var tabla = document.querySelector("#tablaClientes tbody");

clientesLocalStorage();

function clientesLocalStorage() {

    //var tabla = document.querySelector("#tablaClientes tbody");
    var clientes = [];
    var datos = localStorage.getItem(localStorageKeyName);

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
            tdCotizaciones = document.createElement("td"),
            aCotizaciones = document.createElement("a"),
            tdOrdenesdeTrabajo = document.createElement("td"),
            aOrdenesdeTrabajo = document.createElement("a"),
            tdOpciones = document.createElement("td"),
            btnEliminar = document.createElement("a");
        btnEditar = document.createElement("a");

        tdIdentificacion.className = 'col';
        tdIdentificacion.innerHTML = x.identificacion;
        tdNombre.innerHTML = x.nombre;
        tdApellido.innerHTML = x.apellido;
        tdDirección.innerHTML = x.direccion;
        tdEmail.innerHTML = x.email;
        tdTeléfono.innerHTML = x.telefono;

        //cotizaciones
        aCotizaciones.textContent = 'Ver';
        aCotizaciones.style.cursor = 'pointer';
        aCotizaciones.addEventListener('click', function() {
            cotizacionesdelCliente(x.identificacion)
        });
        tdCotizaciones.appendChild(aCotizaciones);

        //ordenes de trabajo
        aOrdenesdeTrabajo.textContent = 'Ver';
        aOrdenesdeTrabajo.style.cursor = 'pointer';
        aOrdenesdeTrabajo.addEventListener('click', function() {
            ordenesTrabajoCliente(x.identificacion)
        });
        tdOrdenesdeTrabajo.appendChild(aOrdenesdeTrabajo);

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
        tr.appendChild(tdCotizaciones);
        tr.appendChild(tdOrdenesdeTrabajo);
        tr.appendChild(tdOpciones);

        tabla.appendChild(tr);

    });
}

const filtrar = () => {
    var datos = localStorage.getItem(localStorageKeyName);
    var clientes = [];
    clientes = JSON.parse(datos);
    tabla.innerHTML = '';
    const texto = buscador.value.toLowerCase();
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
                tdCotizaciones = document.createElement("td"),
                aCotizaciones = document.createElement("a"),
                tdOrdenesdeTrabajo = document.createElement("td"),
                aOrdenesdeTrabajo = document.createElement("a"),
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

            //cotizaciones
            aCotizaciones.textContent = 'Ver';
            aCotizaciones.style.cursor = 'pointer';
            aCotizaciones.addEventListener('click', function() {
                cotizacionesdelCliente(producto.identificacion)
            });
            tdCotizaciones.appendChild(aCotizaciones);

            //ordenes de trabajo
            aOrdenesdeTrabajo.textContent = 'Ver';
            aOrdenesdeTrabajo.style.cursor = 'pointer';
            aOrdenesdeTrabajo.addEventListener('click', function() {
                ordenesTrabajoCliente(producto.identificacion);
            });
            tdOrdenesdeTrabajo.appendChild(aOrdenesdeTrabajo);

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
            tr.appendChild(tdCotizaciones);
            tr.appendChild(tdOrdenesdeTrabajo);
            tr.appendChild(tdOpciones);

            tabla.appendChild(tr);

        }
    });

    if (tabla.innerHTML === '') {
        tabla.innerHTML += `<p>Cliente no encontrado</p>`
    }
}

buscador.addEventListener('keyup', filtrar);

function editar(id, cliente) {

    sessionStorage.setItem(sessionStorageKeyNameEditar, JSON.stringify(cliente[id]));
    location.href = "./clientesAdmin.html"

}

function cotizacionesdelCliente(id) {

    var cotizaciones = [];
    var dat = localStorage.getItem(localCotizaciones);

    var bandera = false;
    if (dat !== null) {
        cotizaciones = JSON.parse(dat);
    }

    cotizaciones.forEach(function(x) {
        if (x.identificacion == id) {
            myf(id, 1)
            bandera = true;
        }
    });

    if (bandera === false) {
        swal({
            text: "Ninguna cotización asociada a este cliente",
            button: "Aceptar"
        });
    }

}

function ordenesTrabajoCliente(id) {

    var ordentrabajo = [];
    var dat = localStorage.getItem(localOrdenTabajo);

    var bandera = false;
    if (dat !== null) {
        ordentrabajo = JSON.parse(dat);
    }

    ordentrabajo.forEach(function(x) {
        if (x.identificacion == id) {
            myf(id, 2)
            bandera = true;
        }
    });

    if (bandera === false) {
        swal({
            text: "Ninguna orden de trabajo asociada a este cliente",
            button: "Aceptar"
        });
    }

}

function myf(codigo, opc) {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    mostrarDatos(codigo, opc);

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function mostrarDatos(id, opc) {

    if (opc == 1) {
        var cotizaciones = [];
        var dat = localStorage.getItem(localCotizaciones);
        var cargardatos = document.getElementById("datosProducto");

        if (dat !== null) {
            cotizaciones = JSON.parse(dat);
        }
        cargardatos.innerHTML = '';

        cotizaciones.forEach(function(x) {

            if (id == x.identificacion) {
                var datos = document.createElement("p"),
                    pIdentificacion = document.createElement("p"),
                    pNombre = document.createElement("p"),
                    pProducto = document.createElement("ul"),
                    pCantidad = document.createElement("p"),
                    pValor = document.createElement("p");


                pIdentificacion.innerHTML = ' Codigo: ' + x.identificacion;
                pNombre.innerHTML = ' Nombre: ' + x.cliente;

                x.productos.forEach(e => {
                    aproducto = document.createElement('li');
                    aproducto.innerHTML = e.nombre + ' Cantidad: ' + e.cantidad + ' Precio: ' + e.precio;
                    pProducto.appendChild(aproducto);

                });

                datos.appendChild(pIdentificacion);
                datos.appendChild(pNombre);
                datos.appendChild(pProducto);
                cargardatos.appendChild(datos);
                cargardatos.className = 'mostrarModal';

            }
        });
    } else {
        var ordentrabajo = [];
        var dat = localStorage.getItem(localOrdenTabajo);
        var cargardatos = document.getElementById("datosProducto");

        if (dat !== null) {
            ordentrabajo = JSON.parse(dat);
        }
        cargardatos.innerHTML = '';

        ordentrabajo.forEach(function(x) {

            if (id == x.identificacion) {
                var datos = document.createElement("p"),
                    pIdentificacion = document.createElement("p"),
                    pNombre = document.createElement("p"),
                    pProducto = document.createElement("ul"),
                    pEstado = document.createElement("p"),
                    pResposable = document.createElement("p");


                pIdentificacion.innerHTML = ' Codigo: ' + x.identificacion;
                pNombre.innerHTML = ' Nombre: ' + x.cliente;
                pResposable.innerHTML = ' Responsable: ' + x.resposable;
                pEstado.innerHTML = ' Estado: ' + x.estado;

                x.productos.forEach(e => {
                    aproducto = document.createElement('li');
                    aproducto.innerHTML = e.nombre + ' Cantidad: ' + e.cantidad + ' Precio: ' + e.precio;
                    pProducto.appendChild(aproducto);

                });

                datos.appendChild(pIdentificacion);
                datos.appendChild(pNombre);
                datos.appendChild(pResposable);
                datos.appendChild(pEstado);
                datos.appendChild(pProducto);
                cargardatos.appendChild(datos);
                cargardatos.className = 'mostrarModal';

            }
        });
    }
}

function removeFromLocalStorage(index) {
    var clientes = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

    clientes = JSON.parse(dataInLocalStorage);

    clientes.splice(index, 1);

    localStorage.setItem(localStorageKeyName, JSON.stringify(clientes));
    clientesLocalStorage();
}