var LocalOperador = 'Operadores';

var nombre = document.getElementById('nombre');
var email = document.getElementById('correo');
var contraseña = document.getElementById('contraseña');
var cargo = document.getElementById('cargo');
var btnRegistrarse = document.getElementById('registrarse');


btnRegistrarse.addEventListener("click", function() {


    if (nombre.value.length === 0 || contraseña.value.length === 0 || cargo.value.length === 0 || email.value.length === 0 || ValidarEmail(email) === false) return;


    ValidarEmail(email);

    var operador = {
        nombre: nombre.value,
        email: email.value,
        contraseña: contraseña.value,
        cargo: cargo.value
    }

    nombre.value = '';
    email.value = '';
    contraseña.value = '';
    cargo.value = '';

    agregaraLocalStorage(operador);

    swal({
        text: "operador agregado satisfactoriamente!",
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
    var operadores = [];
    var data = localStorage.getItem(LocalOperador);

    if (data !== null) {
        operadores = JSON.parse(data);
    }

    operadores.push(obj);

    localStorage.setItem(LocalOperador, JSON.stringify(operadores));
}
