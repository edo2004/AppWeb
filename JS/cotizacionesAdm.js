var localCotizaciones = 'cotizaciones';
const addCotizaciones = document.querySelector('#producto-list')
const footerCot = document.getElementById('footer-cot')
const templateTotal = document.querySelector('#template-total').content;
const templateCliente = document.querySelector('#template-cliente').content;
const templateProducto = document.querySelector('#template-producto').content;
const fragment = document.createDocumentFragment();

var buscador = document.getElementById("search");


var sessionStorageKeyNameEditarCotizaciones = 'editarcotizaciones';

document.addEventListener('DOMContentLoaded', () => {
    pintarCotizaciones();;
})

addCotizaciones.addEventListener('click', e => {
    gestionarCotizaciones(e);
})

function pintarCotizaciones() {
    var cotizaciones = [];
    var datos = localStorage.getItem(localCotizaciones);

    if (datos !== null) {
        cotizaciones = JSON.parse(datos);

        //borrar datos 
        // cotizaciones.splice(0, 1);
        // localStorage.setItem(localCotizaciones , JSON.stringify(cotizaciones));
    }

    addCotizaciones.innerHTML = '';
    cotizaciones.forEach((cotizaciones, j) => {
        // console.log(cotizaciones)
        var tamaño = cotizaciones.productos.length
        templateCliente.querySelector('th').textContent = cotizaciones.identificacion
        templateCliente.querySelector('th').setAttribute("rowspan", tamaño + 1);
        templateCliente.querySelector('td').textContent = cotizaciones.cliente
        templateCliente.querySelector('td').setAttribute("rowspan", tamaño + 1);
        const clone = templateCliente.cloneNode(true)
        fragment.appendChild(clone)
        for (let i = 0; i < tamaño; i++) {

            templateProducto.querySelectorAll('td')[0].textContent = cotizaciones.productos[i].nombre
            templateProducto.querySelectorAll('td')[1].textContent = cotizaciones.productos[i].cantidad
            templateProducto.querySelector('span').textContent = cotizaciones.productos[i].precio * cotizaciones.productos[i].cantidad

            if (i == 0) {
                const modificarElem = document.createElement('td')
                    // const eliminarCot = document.createElement('img')

                // eliminarCot.setAttribute("class", "productos_image")
                // eliminarCot.setAttribute("src", "https://image.flaticon.com/icons/png/512/1214/1214428.png")
                // eliminarCot.dataset.id = cotizaciones.identificacion

                // modificarElem.appendChild(eliminarCot)

                modificarElem.innerHTML = `
                <div class="productos_image" >
                <img id="item-buton" class="modificar-cot" data-id="${cotizaciones.identificacion}"
                src="https://www.flaticon.com/premium-icon/icons/svg/2990/2990003.svg" alt="actualizar" >
                </div>
                <div class="productos_image">
                <img id="item-buton" class="eliminar-cot" data-id="${cotizaciones.identificacion}"
                src="https://image.flaticon.com/icons/png/512/1214/1214428.png" alt="eliminar" >
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
    // console.log(`Hola eliminar el codigo ${eliminarDat}`)
    // console.log(`Hola modificar el codigo ${modificarDat}`)
    //    console.log(eliminarDat)
    //console.log(modificarDat)

    var cotizaciones = []
    var datos = localStorage.getItem(localCotizaciones);
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

        if (e.target.classList.contains('eliminar-cot')) {
            if (cotizacion.identificacion == eliminarDat) {
                console.log(i)
                eliminarCot(i)
            }
        }
    })
}

function modificarCot(id, cotizacion) {
    console.log(cotizacion[id])

    sessionStorage.setItem(sessionStorageKeyNameEditarCotizaciones, JSON.stringify(cotizacion[id]));
    location.href = "./NuevaCotizacionAdmin.html"

}

function eliminarCot(index) {
    console.log(index)
    var cotizaciones = []
    var datos = localStorage.getItem(localCotizaciones);
    if (datos !== null) {
        cotizaciones = JSON.parse(datos);
    }
    console.log(cotizaciones[index])
    cotizaciones.splice(index, 1);
    localStorage.setItem(localCotizaciones, JSON.stringify(cotizaciones));

    swal({
        text: "Cotizacion eliminada satisfactoriamente!",
        icon: "success",
    });

    pintarCotizaciones(cotizaciones)
}



const filtrar = () => {
    var cotizaciones = [];
    var datos = localStorage.getItem(localCotizaciones);

    if (datos !== null) {
        cotizaciones = JSON.parse(datos);
    }

    addCotizaciones.innerHTML = '';
    const texto = buscador.value.toLowerCase();
    cotizaciones.forEach(function(cotizaciones) {
        let nombres = cotizaciones.cliente.toLowerCase();
        if (nombres.indexOf(texto) !== -1) {

            //cotizaciones.forEach((cotizaciones, j) => {
            // console.log(cotizaciones)
            var tamaño = cotizaciones.productos.length
            templateCliente.querySelector('th').textContent = cotizaciones.identificacion
            templateCliente.querySelector('th').setAttribute("rowspan", tamaño + 1);
            templateCliente.querySelector('td').textContent = cotizaciones.cliente
            templateCliente.querySelector('td').setAttribute("rowspan", tamaño + 1);
            const clone = templateCliente.cloneNode(true)
            fragment.appendChild(clone)
            for (let i = 0; i < tamaño; i++) {

                templateProducto.querySelectorAll('td')[0].textContent = cotizaciones.productos[i].nombre
                templateProducto.querySelectorAll('td')[1].textContent = cotizaciones.productos[i].cantidad
                templateProducto.querySelector('span').textContent = cotizaciones.productos[i].precio * cotizaciones.productos[i].cantidad

                if (i == 0) {
                    const modificarElem = document.createElement('td')

                    modificarElem.innerHTML = `
                        <div class="productos_image" >
                        <img id="item-buton" class="modificar-cot" data-id="${cotizaciones.identificacion}"
                        src="https://www.flaticon.com/premium-icon/icons/svg/2990/2990003.svg" alt="actualizar" >
                        </div>
                        <div class="productos_image">
                        <img id="item-buton" class="eliminar-cot" data-id="${cotizaciones.identificacion}"
                        src="https://image.flaticon.com/icons/png/512/1214/1214428.png" alt="eliminar" >
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

            //})
            addCotizaciones.appendChild(fragment)
            console.log(addCotizaciones)

        }
    });

    if (addCotizaciones.innerHTML === '') {
        addCotizaciones.innerHTML += `<p>Cliente no encontrado</p>`
    }
}

buscador.addEventListener('keyup', filtrar);