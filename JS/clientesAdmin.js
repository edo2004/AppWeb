var localStorageKeyName = 'clientes';
var sessionStorageKeyNameEditar = 'editar';

var identificacion = document.getElementById("identificacion");
var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var direccion = document.getElementById("direccion");
var email = document.getElementById("email");
var telefono = document.getElementById("telefono");
var btnGuardar = document.querySelector("#btn-guardar")

if (sessionStorage.getItem(sessionStorageKeyNameEditar) !== null) {
cargardato();
} 


function cargardato() {

    var datos = sessionStorage.getItem(sessionStorageKeyNameEditar);
    clienteEditar = JSON.parse(datos);

    identificacion.value = clienteEditar.identificacion;
    nombre.value = clienteEditar.nombre;
    apellido.value = clienteEditar.apellido;
    direccion.value = clienteEditar.direccion;
    email.value = clienteEditar.email;
    telefono.value = clienteEditar.telefono;

}

btnGuardar.addEventListener("click", function() {


    if (identificacion.value.length === 0 || nombre.value.length === 0 || apellido.value.length === 0 || direccion.value.length === 0 || email.value.length === 0 || !parseInt(telefono.value) || ValidarEmail(email) === false) return;


    ValidarEmail(email);

    var cliente = {
        identificacion: identificacion.value,
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        email: email.value,
        telefono: telefono.value
    }

    identificacion.value = '';
    nombre.value = '';
    apellido.value = '';
    direccion.value = '';
    email.value = '';
    telefono.value = '';

    agregaraLocalStorage(cliente);

    removeEditar();

    swal({
        text: "Cliente agregado satisfactoriamente!",
        icon: "success",
      });


});

function ValidarEmail(email) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.value.match(validRegex)) {
        return true;
    } else {
        alert("Ingrese un email valido");
        return false;
    }
}


function agregaraLocalStorage(obj) {
    var clientes = [];
    var dataLocalStorage = localStorage.getItem(localStorageKeyName);

    if (dataLocalStorage !== null) {
        clientes = JSON.parse(dataLocalStorage);
    }

    clientes.push(obj);

    localStorage.setItem(localStorageKeyName, JSON.stringify(clientes));
}

function removeEditar() {

    sessionStorage.removeItem(sessionStorageKeyNameEditar);

}