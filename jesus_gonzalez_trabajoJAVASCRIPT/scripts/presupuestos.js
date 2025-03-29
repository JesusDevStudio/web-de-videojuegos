/*document.addEventListener('DOMContentLoaded', function () {
    // Obtener la URL actual del navegador
    const urlLocation = window.location.href;

    // Verificar si la URL actual incluye "presupuestos.html"
    if (urlLocation.includes("presupestos.html")) { // Error de ortografía corregido: "presupuestos.html"
        // Encontrar el enlace actual que apunta a "presupestos.html"
        const currentLink = document.querySelector('a[href="./presupestos.html"]');
        
        // Verificar si se encontró el enlace actual
        if (currentLink) {
            // Cambiar el color del enlace actual a "red" (rojo)
            currentLink.style.color = 'red'; 
        }
    }

    // Obtener el formulario por su ID
    const formulario = document.getElementById('contactForm');

    // Agregar un evento de escucha al formulario para capturar el envío
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const producto = document.getElementById('producto').value;
        const plazo = document.getElementById('plazo').value;

        // Crear un array para almacenar los valores de los extras seleccionados
        const extras = [];
        const checkboxes = document.querySelectorAll('input[name="extras"]:checked');
        checkboxes.forEach(checkbox => {
            extras.push(checkbox.value);
        });

        // Verificar si se aceptaron las condiciones
        const aceptarCondiciones = document.getElementById('aceptarCondiciones').checked;

        // Crear un objeto con los datos del formulario
        const datosFormulario = {
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            correo: correo,
            producto: producto,
            plazo: plazo,
            extras: extras,
            aceptarCondiciones: aceptarCondiciones
        };

        // Mostrar los datos del formulario en la consola
        console.log('Datos del formulario:', datosFormulario);
    });
});*/

let value=100
const currentAmount=document.querySelector('.price-status')
currentAmount.textContent=`$${value}`
const cuotas= document.getElementById("plazo");

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('contactForm');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const plazo = parseInt(document.getElementById('plazo').value); // Convertir a entero
        const aceptarCondiciones = document.getElementById('aceptarCondiciones').checked;

        // Definimos una variable "error" para almacenar el mensaje de error
        let error = '';

        if (!validarNombre(nombre)) {
            error = 'nombre';
        } else if (!validarApellidos(apellidos)) {
            error = 'apellidos';
        } else if (!validarTelefono(telefono)) {
            error = 'telefono';
        } else if (!validarCorreo(correo)) {
            error = 'correo';
        } else if (!validarPlazo(plazo)) { // Validar plazo
            error = 'plazo';
        } else if (!aceptarCondiciones) {
            error = 'aceptarCondiciones';
        }

        switch (error) {
            case 'nombre':
                alert('Error: El nombre es inválido. Solo letras, máximo 15 caracteres.');
                break;
            case 'apellidos':
                alert('Error: Los apellidos son inválidos. Solo letras, máximo 40 caracteres.');
                break;
            case 'telefono':
                alert('Error: El teléfono es inválido. Solo números, máximo 9 dígitos.');
                break;
            case 'correo':
                alert('Error: El formato del correo no es válido.');
                break;
            case 'plazo':
                alert('Error: El plazo debe ser mayor a 0.'); // Mensaje de error para plazo no válido
                break;
            case 'aceptarCondiciones':
                alert('Error: Debes aceptar las condiciones para continuar.');
                break;
            default:
                // No hay errores, procesamos el formulario
                const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(checkbox => parseFloat(checkbox.value));
                let extra1Checked = document.getElementById("extra1").checked;
                let extra2Checked = document.getElementById("extra2").checked;
                let extra3Checked = document.getElementById("extra3").checked;
                const datosFormulario = {
                    nombre, apellidos, telefono, correo, plazo,  extras, aceptarCondiciones
                };
                console.log('Datos del formulario:', datosFormulario);
                // Aquí podrías enviar los datos a un servidor o manejarlos como necesites
                if(extra1Checked === true){
                    alert('Formulario enviado con éxito. Total: $'+ (value/cuotas.value + 50) );
                }
                if(extra2Checked === true){
                    alert('Formulario enviado con éxito. Total: $'+ (value/cuotas.value + 75) );
                }
                if(extra3Checked === true){
                    alert('Formulario enviado con éxito. Total: $'+ (value/cuotas.value + 100) );
                }
                if(extra3Checked === false && extra2Checked === false && extra1Checked === false){
                    alert('Formulario enviado con éxito. Total: $'+ value/cuotas.value );
                }
                break;
        }
        
    });

    function validarNombre(nombre) {
        const re = /^[A-Za-z]{1,15}$/;
        return re.test(nombre);
    }

    function validarApellidos(apellidos) {
        const re = /^[A-Za-z]{1,40}$/;
        return re.test(apellidos);
    }

    function validarTelefono(telefono) {
        const re = /^[0-9]{9}$/;
        return re.test(telefono);
    }

    function validarCorreo(correo) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(correo);
    }

    function validarPlazo(plazo) {
        return plazo > 0; // Plazo debe ser mayor a 0
    }
});
