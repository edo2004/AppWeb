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
            aOrdenesdeTrabajo = document.createElement("a");

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

        tr.appendChild(tdIdentificacion);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdDirección);
        tr.appendChild(tdDirección);
        tr.appendChild(tdEmail);
        tr.appendChild(tdTeléfono);
        tr.appendChild(tdCotizaciones);
        tr.appendChild(tdOrdenesdeTrabajo);

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
                aOrdenesdeTrabajo = document.createElement("a");

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


            tr.appendChild(tdIdentificacion);
            tr.appendChild(tdNombre);
            tr.appendChild(tdApellido);
            tr.appendChild(tdDirección);
            tr.appendChild(tdDirección);
            tr.appendChild(tdEmail);
            tr.appendChild(tdTeléfono);
            tr.appendChild(tdCotizaciones);
            tr.appendChild(tdOrdenesdeTrabajo);

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
    var span = document.querySelector(".close-modal")
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

    var nombreCliente = document.querySelector("#nombre-persona")
    var idCliente = document.querySelector("#id-persona")
    var templateDetalle = document.querySelector("#detalle-productos").content
    var templateheader = document.querySelector("#encabezado-product").content
    var fragment = document.createDocumentFragment();
    if (opc == 1) {
        var cotizaciones = [];
        var dat = localStorage.getItem(localCotizaciones);
        var cargardatos = document.getElementById("datosProducto");

        if (dat !== null) {
            cotizaciones = JSON.parse(dat);
        }
        cargardatos.innerHTML = '';

        cotizaciones.forEach(function(datosCot) {

            if (id == datosCot.identificacion) {
                nombreCliente.innerHTML = datosCot.cliente
                idCliente.innerHTML = datosCot.identificacion

                const clone = templateheader.cloneNode(true)
                fragment.appendChild(clone)

                datosCot.productos.forEach(producto => {
                    templateDetalle.querySelector(".nombre-pro").textContent = producto.nombre
                    templateDetalle.querySelector(".cantidad-pro").textContent = producto.cantidad
                    templateDetalle.querySelector(".precio-pro").textContent = producto.precio*producto.cantidad

                    const clonar = templateDetalle.cloneNode(true)
                    fragment.appendChild(clonar)

                });

            }
            cargardatos.appendChild(fragment)
        });
    } else {
        var ordentrabajo = [];
        var dat = localStorage.getItem(localOrdenTabajo);
        var cargardatos = document.getElementById("datosProducto");
        var templateEncabezado = document.querySelector("#encabezado-productos").content

        if (dat !== null) {
            ordentrabajo = JSON.parse(dat);
        }
        cargardatos.innerHTML = '';

        ordentrabajo.forEach(function(datosOrden) {

            if (id == datosOrden.identificacion) {

                nombreCliente.innerHTML = datosOrden.cliente
                idCliente.innerHTML = datosOrden.identificacion

                templateEncabezado.querySelector("#responsable").textContent = datosOrden.responsable
                templateEncabezado.querySelector("#estado").textContent = datosOrden.estado

                const clone = templateEncabezado.cloneNode(true)
                fragment.appendChild(clone)

                datosOrden.productos.forEach(producto => {
                    templateDetalle.querySelector(".nombre-pro").textContent = producto.nombre
                    templateDetalle.querySelector(".cantidad-pro").textContent = producto.cantidad
                    templateDetalle.querySelector(".precio-pro").textContent = producto.precio*producto.cantidad

                    const clonar = templateDetalle.cloneNode(true)
                    fragment.appendChild(clonar)

                });

            }
            cargardatos.appendChild(fragment)
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