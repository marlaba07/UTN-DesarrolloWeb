const allowedAge = 18;

const buttonSubmitForm = document.getElementById('studentForm');
const buttonViewStudents = document.getElementById('viewTableStudents');
const buttonReturnForm = document.getElementById('returnForm');
const buttonViewFormGradesSt = document.getElementById('studentGrades');
const buttonCloseModal = document.getElementById('closeModal');
const modal = document.getElementById('modalForm');

// Crear un arreglo con elementos ya pre-cargados para tener información en la tabla de alumnos.
const arrayStudents = [
    {
        name: "Esteban Quito",
        email: "estebanquito@ejemplo.com.ar",
        dni: "44234234",
        phone: "2235234567",
        age: 20
    }
];

// Botón correspondiente a cuando le damos a 'enviar'
buttonSubmitForm.addEventListener('submit', function (event) {
    // Evita recargar la página cuando le doy click al botón submit. (Lo necesito para que no me vacie el array de manera inesperada).
    event.preventDefault();

    if(event) alert('¡Formulario enviado con éxito!');
    
    // Almaceno los valores de los campos al enviar los datos en variables. 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dni = document.getElementById('dni').value;
    const phone = document.getElementById('phone').value;

    const birthdate = document.getElementById('birthdate').value;

    // Verifico si el DNI ya existe en el arreglo de estudiantes. (retorna un boolean)
    const dniExists = arrayStudents.some(student => student.dni === dni)

    // Calculo la edad (llamo a mi función del archivo utils)
    const age = calculateAge(birthdate);
   
    if (age < allowedAge){
        alert('¡Restriccion de edad minima!');
        return;
    }

    if (dniExists) {
        alert('El DNI ya está registrado.');
        return; 
    }

    // Creo un objeto de estudiantes que representará a cada variable almacenada. 
    const student = {
        name: name,
        email: email,
        dni: dni,
        phone: phone,
        age: age
    };

    // Pusheo los datos del estudiante en un array para mostrarlos posteriormente en la tabla.
    arrayStudents.push(student);
    console.log(arrayStudents);

    // ordenamos alfabeticamente con el metodo .sort de js dentro de la función
    sortArray();

    // Borro los campos al hacer submit.
    buttonSubmitForm.reset();
});

// Botón correspondiente a cuando le damos a 'ver tabla alumnos'
buttonViewStudents.addEventListener('click', function (event) {
    // Evita recargar la página cuando le doy click al botón "ver tabla alumnos". (Lo necesito para que no me vacie el array de manera inesperada).
    event.preventDefault();

    document.querySelector('.flip-card').classList.add('flipped');

    const tbody = document.querySelector('#tableStudents tbody');
    tbody.innerHTML = '';

    arrayStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.dni}</td>
            <td>${student.phone}</td>
            <td>${student.age}</td>
            <td>${student.qualification}</td>
            <td>${student.subject}</td>
        `;

        tbody.appendChild(row);
    });
});

// Botón correspondiente a cuando le damos a 'volver al formulario'
buttonReturnForm.addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.flip-card').classList.remove('flipped');
});

// Abrir el modal al hacer clic en "Agregar notas"
buttonViewFormGradesSt.addEventListener('click', function (event) {
    event.preventDefault();
    modal.style.display = 'block'; // Muestra el modal
});

// Cerrar el modal al hacer clic en la 'x'
buttonCloseModal.addEventListener('click', function () {
    modal.style.display = 'none'; // Oculta el modal
});


