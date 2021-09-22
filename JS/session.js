var LocalOperador = 'Operadores';
var LocalSession = 'Sessions';

var email = document.getElementById('correo');
var contraseña = document.getElementById('contraseña');
var btnSession = document.getElementById('session');

document.addEventListener('DOMContentLoaded', () => {
    cargarOperadores();
})

function cargarOperadores() {

    var operadores = [];
    var data = localStorage.getItem(LocalOperador);

    if (data !== null) {
        operadores = JSON.parse(data);
    }

    // operadores.splice(3, 1);
    // localStorage.setItem(localOperador, JSON.stringify(operadores));
    console.log(operadores);
    btnSession.addEventListener("click", function() {
    iniciarSession(operadores)
    })
}

const iniciarSession = operadores => {
    var cont = 0
    operadores.forEach(operador => {
        if(operador.email == email.value && operador.contraseña === contraseña.value){
            cont ++;
            redireccionarUsuario(operador)
            guardarSession(operador)
            
        }
    })
    if(cont<1){
        swal({
            text: "Datos incorrectos",
            icon: "error",
          });
    }
}

const redireccionarUsuario = usuario => {
    if(usuario.cargo == "administrador"){
        location.href = "../productosAdministrador.html"
    }else{
        location.href = "../productos.html"
    }
}

const guardarSession = usuario => {
    sessionStorage.setItem(LocalSession, JSON.stringify(usuario.nombre));
}

