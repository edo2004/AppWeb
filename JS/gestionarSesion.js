var LocalSession = 'Sessions';

const administrador = document.querySelector('h6');
const cerrarSession = document.querySelector('.cerrar-sesion')
document.addEventListener('DOMContentLoaded', () => {
    cargarSession();
})

// Gestionar sesion del usuario

function cargarSession () {
    var sessions = [];
    var datos = sessionStorage.getItem(LocalSession);
    if (datos !== null) {
        sessions = JSON.parse(datos);
        administrador.innerText = sessions
        if(typeof responsable != 'undefined') {
            responsable.value = sessions
        }
    }
        
}
cerrarSession.addEventListener('click', function () {
    sessionStorage.removeItem(LocalSession)

})
