/* 
Obtengo el ID del ID alumnosForm (id del formulario) y cuando se genere el submit registo con getElementById el evento del elemento. 

- addEventListener: es un método en JavaScript que se utiliza para registrar un evento en un elemento del DOM (Document Object Model). 
                    Este método le permite escuchar un evento específico (como un clic, un envío de formulario, o la pulsación de una tecla) y 
                    ejecutar una función cuando ese evento ocurre.
*/

let boton = document.getElementById('alumnosForm')
let arregloEstudiantes = [];

boton.addEventListener('submit', function (event) {
    // Evito que se recarge la página después del submit, porque pierdo los datos del arreglo (porque están en memoria).


    // Guardo en variables los elementos que el usuario ingresa en el formulario para utilizarlos posteriormente
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    // Creo un objeto con los datos que necesito.
    const estudiante = {
        nombre: nombre,
        email: email,
        dni: dni,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento
    };

    // Almaceno en el arreglo de estudiantes los datos ingresados por el usuario. 
    arregloEstudiantes.push(estudiante);
    console.log(arregloEstudiantes)
})