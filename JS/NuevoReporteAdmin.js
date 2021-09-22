var localProductosAlmacenar = 'productosalmacenar';
var localOrdenTabajo = 'OrdenesDeTrabajo';
var localOrdenTabajoAlmacenar = 'ordentrabajoalmacenar';

var buscar = document.querySelector('#buscar');
var reporte = document.querySelector('#cat');
var fechaInicio = document.querySelector('#inicio');
var fechaFin = document.querySelector('#fin');
var inicioFechaCompras = document.getElementById('inicio-compras')
var finalFechaCompras = document.getElementById('final-compras')
var totalCompras = document.getElementById('total-compras')
var inicioFechaVentas = document.getElementById('inicio-ventas')
var finalFechaVentas = document.getElementById('final-ventas')
var totalVentas = document.getElementById('total-ventas')
var mostrarReporte = document.querySelector('.mostrarReporte');
var reporteCompras = document.querySelectorAll('.card-reporte')[0]
var reporteVentas = document.querySelectorAll('.card-reporte')[1]

var tablahead = document.querySelector("#tablareportes thead");
var tablabody = document.querySelector("#tablareportes tbody");
const templateCliente = document.querySelector('#template-cliente').content;
const templateProducto = document.querySelector('#template-producto').content;
const templateFecha = document.querySelector('#template-fecha').content;

const fragment = document.createDocumentFragment();

reporteVentas.style.display = 'none';
reporteCompras.style.display = 'none';

buscar.addEventListener('click', function() {

    if (reporte.value == 1) {
        generarReporteInventario(fechaInicio.value, fechaFin.value);

    } else if (reporte.value == 2) {
        generarReporteOrdenes(fechaInicio.value, fechaFin.value)
    } else {
        generarReporteCompras(fechaInicio.value, fechaFin.value)
    }
})

function generarReporteInventario(fechaDeInicio, fechaDeFinalizacion) {

    tablahead.innerHTML = '';
    tablabody.innerHTML = '';
    templateCliente.innerHTML = '';
    templateProducto.innerHTML = '';
    templateFecha.innerHTML = '';
    reporteVentas.style.display = 'none';
    reporteCompras.style.display = 'none';

    var productos = [];
    var ordentrabajo = [];
    var datos = localStorage.getItem(localProductosAlmacenar);
    var datosorden = localStorage.getItem(localOrdenTabajoAlmacenar);

    if (datos !== null || datosorden !== null) {
        productos = JSON.parse(datos);
        ordentrabajo = JSON.parse(datosorden);
    }

    var resultadoP = [];
    var resultadoO = [];
    var i = 0;
    var j = 0;
    productos.forEach(e => {
        if ((e.fecha) >= fechaDeInicio&& (e.fecha) <= fechaDeFinalizacion) {
            resultadoP[i] = e;
            i++;
        }
    });

    ordentrabajo.forEach(ej => {
        if ((ej.fecha) >= fechaDeInicio&& (ej.fecha) <= fechaDeFinalizacion) {
            resultadoO[j] = ej;
            j++;
        }
    });

    if (resultadoP.length != 0 || resultadoO.length != 0) {
        var tr = document.createElement("tr"),
            thNombre = document.createElement("th"),
            thCantidad = document.createElement('th'),
            thoperacion = document.createElement('th'),
            thfecha = document.createElement('th');

        thNombre.className = 'col';
        thNombre.textContent = 'Nombre';
        thCantidad.textContent = 'Cantidad';
        thoperacion.textContent = 'Operación';
        thfecha.textContent = 'Fecha';

        tr.appendChild(thNombre);
        tr.appendChild(thCantidad);
        tr.appendChild(thoperacion);
        tr.appendChild(thfecha);

        tablahead.appendChild(tr);

        if (resultadoP.length != 0) {
            resultadoP.forEach(function(e) {
                var tr = document.createElement("tr"),
                    tdNombre = document.createElement("td"),
                    tdCantidad = document.createElement('td'),
                    tdoperacion = document.createElement('td'),
                    tdfecha = document.createElement('td');

                tdNombre.className = 'col';
                tdNombre.innerHTML = e.nombre;
                tdCantidad.innerHTML = e.unidad;
                tdoperacion.innerHTML = 'Entrada';
                tdfecha.innerHTML = e.fecha;

                tr.appendChild(tdNombre);
                tr.appendChild(tdCantidad);
                tr.appendChild(tdoperacion);
                tr.appendChild(tdfecha);

                tablabody.appendChild(tr);
            });
        }

        if (resultadoO.length != 0) {
            resultadoO.forEach(function(e) {
                var tamaño = e.productos.length

                for (var i = 0; i < tamaño; i++) {

                    templateFecha.querySelectorAll('td')[0].textContent = e.productos[i].nombre
                    templateFecha.querySelectorAll('td')[0].className = 'col'
                    templateFecha.querySelectorAll('td')[1].textContent = e.productos[i].cantidad
                    templateFecha.querySelectorAll('td')[2].textContent = 'Salida'
                    templateFecha.querySelectorAll('td')[3].textContent = e.fecha

                    const clonar = templateFecha.cloneNode(true)
                    fragment.appendChild(clonar)
                }
                tablabody.appendChild(fragment);
            });
        }
    } else {
        tablahead.innerHTML += `<h4>Sin resultados, ingrese otra fecha</h4>`
    }

}
function generarReporteOrdenes(fechaDeInicio, fechaDeFinalizacion) {
    tablahead.innerHTML = '';
    tablabody.innerHTML = '';
    templateCliente.innerHTML = '';
    templateProducto.innerHTML = '';
    templateFecha.innerHTML = '';
    reporteVentas.style.display = 'none';
    reporteCompras.style.display = 'none';
    
    var productos = [];
    var datos = localStorage.getItem(localOrdenTabajoAlmacenar);
    if (datos !== null) {
        productos = JSON.parse(datos);
    }

    var resultado = [];
    var i = 0;
    productos.forEach(e => {
        if ((e.fecha) >= fechaDeInicio&& (e.fecha) <= fechaDeFinalizacion) {
            resultado[i] = e;
            i++;
        }
    });

    if (resultado.length != 0) {
        var tr = document.createElement("tr"),
            thIdentificacion = document.createElement("th"),
            thNombre = document.createElement("th"),
            thResponsable = document.createElement('th'),
            thmetodopago = document.createElement('th'),
            thfecha = document.createElement('th'),
            thestado = document.createElement('th'),
            thnombreproducto = document.createElement('th'),
            thcantidad = document.createElement('th'),
            thvalor = document.createElement('th');

        thIdentificacion.className = 'col';
        thIdentificacion.textContent = 'Codigo';
        thNombre.textContent = 'Cliente';
        thResponsable.textContent = 'Responsable';
        thestado.textContent = 'Estado';
        thmetodopago.textContent = 'Metodo de pago';
        thfecha.textContent = 'Fecha';
        thnombreproducto.textContent = 'Nombre de producto';
        thcantidad.textContent = 'Cantidad';
        thvalor.textContent = 'Valor';

        tr.appendChild(thIdentificacion);
        tr.appendChild(thNombre);
        tr.appendChild(thResponsable);
        tr.appendChild(thmetodopago);
        tr.appendChild(thfecha);
        tr.appendChild(thestado);
        tr.appendChild(thnombreproducto);
        tr.appendChild(thcantidad);
        tr.appendChild(thvalor);

        tablahead.appendChild(tr);

        resultado.forEach(ordenTrabajo => {

            var tamaño = ordenTrabajo.productos.length
            templateCliente.querySelectorAll('td')[0].textContent = ordenTrabajo.identificacion
            templateCliente.querySelectorAll('td')[0].setAttribute("rowspan", tamaño + 1);
            templateCliente.querySelectorAll('td')[1].textContent = ordenTrabajo.cliente
            templateCliente.querySelectorAll('td')[1].setAttribute("rowspan", tamaño + 1);
            templateCliente.querySelectorAll('td')[2].textContent = ordenTrabajo.responsable
            templateCliente.querySelectorAll('td')[2].setAttribute("rowspan", tamaño + 1);
            templateCliente.querySelectorAll('td')[3].textContent = ordenTrabajo.metodoPago
            templateCliente.querySelectorAll('td')[3].setAttribute("rowspan", tamaño + 1);
            templateCliente.querySelectorAll('td')[4].textContent = ordenTrabajo.fecha
            templateCliente.querySelectorAll('td')[4].setAttribute("rowspan", tamaño + 1);
            templateCliente.querySelectorAll('td')[5].textContent = ordenTrabajo.estado
            templateCliente.querySelectorAll('td')[5].setAttribute("rowspan", tamaño + 1);
            const clone = templateCliente.cloneNode(true)
            fragment.appendChild(clone)
            for (var i = 0; i < tamaño; i++) {
                templateProducto.querySelectorAll('td')[0].textContent = ordenTrabajo.productos[i].nombre
                templateProducto.querySelectorAll('td')[1].textContent = ordenTrabajo.productos[i].cantidad
                templateProducto.querySelector('span').textContent = ordenTrabajo.productos[i].precio * ordenTrabajo.productos[i].cantidad

                const clonar = templateProducto.cloneNode(true)
                fragment.appendChild(clonar)
            }
        })

        tablabody.appendChild(fragment);
    } else {
        tablahead.innerHTML += `<h4>Sin resultados, ingrese otra fecha</h4>`
    }

} 
function generarReporteCompras(fechaDeInicio, fechaDeFinalizacion) {

    tablahead.innerHTML = '';
    tablabody.innerHTML = '';
    templateCliente.innerHTML = '';
    templateProducto.innerHTML = '';
    templateFecha.innerHTML = '';
    reporteVentas.style.display = 'none';
    reporteCompras.style.display = 'none';
    
        
    var productos = [];
    var ordentrabajo = [];
    var datos = localStorage.getItem(localProductosAlmacenar);
    var datosorden = localStorage.getItem(localOrdenTabajoAlmacenar);

    if (datos !== null || datosorden !== null) {
        productos = JSON.parse(datos);
        ordentrabajo = JSON.parse(datosorden);
    }

    var resultadoP = [];
    var resultadoO = [];
    var i = 0;
    var j = 0;
    productos.forEach(e => {
        if ((e.fecha) >= fechaDeInicio && (e.fecha) <= fechaDeFinalizacion) {
            resultadoP[i] = e;
            i++;
        }
    });
    ordentrabajo.forEach(ej => {
        //cambiar a == Terminado
        if (ej.estado == "Terminado") {
            if ((ej.fecha) >= fechaDeInicio&& (ej.fecha) <= fechaDeFinalizacion) {
                resultadoO[j] = ej;
                j++;
            }
        }
    });
    if (resultadoP.length != 0 || resultadoO.length != 0) {
        
        if (resultadoP.length != 0) {
            reporteCompras.style.display = '';
            var totalComprado = 0;
            resultadoP.forEach(e => {
                totalComprado +=  (parseInt(e.pEntrada)*parseInt(e.unidad) );
            });

            inicioFechaCompras.innerText = fechaDeInicio;
            finalFechaCompras.innerText = fechaDeFinalizacion;
            totalCompras.innerText = "$"+totalComprado;

        }

        if (resultadoO.length != 0) {
            reporteVentas.style.display = '';
            var totalVendido = 0;
            resultadoO.forEach(e => {
                tam = e.productos.length;
                for (i = 0; i < tam; i++) {
                    totalVendido = totalVendido + parseInt(e.productos[i].cantidad * e.productos[i].precio);
                }
            });

            inicioFechaVentas.innerText = fechaDeInicio;
            finalFechaVentas.innerText = fechaDeFinalizacion;
            totalVentas.innerText = "$"+totalVendido;

        }
    } else {
        tablahead.innerHTML += `<h4>Sin resultados, ingrese otra fecha</h4>`
    }
}   