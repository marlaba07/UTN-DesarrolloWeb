let buttonSubmitForm = document.getElementById('alumnosForm');
let buttonViewStudents = document.getElementById('verTablaAlumnos')
let buttonReturnForm = document.getElementById('volverFormulario')

// Crear un arreglo con elementos ya pre-cargados para tener información en la tabla de alumnos.
let arregloEstudiantes = [
    {
        nombre: "Esteban Quito",
        email: "estebanquito@ejemplo.com.ar",
        dni: "12345678",
        telefono: "1234567890",
        fechaNacimiento: "2000-01-01"
    },
    {
        nombre: "Agente 47",
        email: "agente47@ejemplo.com.ar",
        dni: "87654321",
        telefono: "0987654321",
        fechaNacimiento: "1999-02-15"
    }
];

buttonSubmitForm.addEventListener('submit', function (event) {
    // Evita recargar la página cuando le doy click al botón submit. (Lo necesito para que no me vacie el array de manera inesperada).
    event.preventDefault();

    // Almaceno los valores de los campos al enviar los datos en variables. 
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    // Creo un objeto de estudiantes que representará a cada variable almacenada. 
    const estudiante = {
        nombre: nombre,
        email: email,
        dni: dni,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento
    };

    // Pusheo los datos del estudiante en un array para mostrarlos posteriormente en la tabla.
    arregloEstudiantes.push(estudiante);
    console.log(arregloEstudiantes);

    // Borro los campos al hacer submit.
    buttonSubmitForm.reset();
});

buttonViewStudents.addEventListener('click', function (event) {
    // Evita recargar la página cuando le doy click al botón "ver tabla alumnos". (Lo necesito para que no me vacie el array de manera inesperada).
    event.preventDefault();


    document.querySelector('.flip-card').classList.add('flipped');

    const tbody = document.querySelector('#tablaAlumnos tbody');
    tbody.innerHTML = '';

    arregloEstudiantes.forEach(estudiante => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.email}</td>
            <td>${estudiante.dni}</td>
            <td>${estudiante.telefono}</td>
            <td>${estudiante.fechaNacimiento}</td>
        `;

        tbody.appendChild(row);
    });
});

buttonReturnForm.addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.flip-card').classList.remove('flipped');
});
