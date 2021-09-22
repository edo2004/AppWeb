var localOrdenTabajo = 'OrdenesDeTrabajo'

const addCotizaciones = document.querySelector('#producto-list')
const footerCot = document.getElementById('footer-cot')
const templateTotal = document.querySelector('#template-total').content;
const templateCliente = document.querySelector('#template-cliente').content;
const templateProducto = document.querySelector('#template-producto').content;
// const templateEstado = document.querySelector('#template-estado').content
const fragment = document.createDocumentFragment();

var sessionStorageKeyNameEditarOrdenTrabajo = 'editarordentrabajo';

cotizacionesLocalStorage();

addCotizaciones.addEventListener('click', e => {
    gestionarCotizaciones(e);
})

function cotizacionesLocalStorage() {
    var ordenTrabajo = [];
    var datos = localStorage.getItem(localOrdenTabajo);

    if (datos !== null) {
        ordenTrabajo = JSON.parse(datos);

        //borrar datos 
        // cotizaciones.splice(0, 1);
        // localStorage.setItem(localOrdenTrabajo , JSON.stringify(cotizaciones));
    }
    // console.log(ordenTrabajo)

    addCotizaciones.innerHTML = '';
    ordenTrabajo.forEach((ordenTrabajo, j) => {

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

            if (i == 0) {
                const modificarElem = document.createElement('td')
                modificarElem.innerHTML = `
                <div class="productos_image" >
                <img id="item-buton" class="modificar-cot" data-id="${ordenTrabajo.identificacion}"
                src="https://www.flaticon.com/premium-icon/icons/svg/2990/2990003.svg" alt="actualizar" >
                </div>`

                modificarElem.setAttribute("rowspan", tamaño + 1);
                if (tamaño < 2) {
                    modificarElem.classList.add('column-row')
                }
                templateProducto.querySelector('tr').appendChild(modificarElem)

            }

            if (i == 1) {
                templateProducto.querySelector('tr').removeChild(templateProducto.querySelector('tr').lastChild)

            }

            const clonar = templateProducto.cloneNode(true)
            fragment.appendChild(clonar)

            if (tamaño == 1) {
                templateProducto.querySelector('tr').removeChild(templateProducto.querySelector('tr').lastChild)
            }

        }
    })
    addCotizaciones.appendChild(fragment)
    console.log(addCotizaciones)
}


const gestionarCotizaciones = e => {
    const cotizacion = e.target.parentElement
    console.log(cotizacion)
    const eliminar = cotizacion.querySelector('.eliminar-cot')
    const modificar = cotizacion.querySelector('.modificar-cot')
    let eliminarDat
    let modificarDat
    if (eliminar) {
        eliminarDat = eliminar.dataset.id
    }
    if (modificar) {
        modificarDat = modificar.dataset.id
    }

    var cotizaciones = []
    var datos = localStorage.getItem(localOrdenTabajo);
    if (datos !== null) {
        cotizaciones = JSON.parse(datos);
    }

    cotizaciones.forEach(function(cotizacion, i) {
        if (e.target.classList.contains('modificar-cot')) {
            if (cotizacion.identificacion == modificarDat) {
                //console.log(i) 
                modificarCot(i, cotizaciones)
                eliminarCot(i)
            }
        }
    })
}

function modificarCot(id, cotizacion) {
    console.log(cotizacion[id])

    sessionStorage.setItem(sessionStorageKeyNameEditarOrdenTrabajo, JSON.stringify(cotizacion[id]));
    location.href = "./nuevaOrdenTrabajoOpr.html"

}

function eliminarCot(index) {
    console.log(index)
    var cotizaciones = []
    var datos = localStorage.getItem(localOrdenTabajo);
    if (datos !== null) {
        cotizaciones = JSON.parse(datos);
    }
    console.log(cotizaciones[index])
    cotizaciones.splice(index, 1);
    localStorage.setItem(localOrdenTabajo, JSON.stringify(cotizaciones));

    swal({
        text: "Orden de trabajo eliminada satisfactoriamente!",
        icon: "success",
    });

    cotizacionesLocalStorage()
}