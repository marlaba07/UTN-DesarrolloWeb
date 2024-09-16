const allowedAge = 18;

const buttonSubmitForm = document.getElementById('studentForm');
const buttonViewStudents = document.getElementById('viewTableStudents');
const buttonReturnForm = document.getElementById('returnForm');
const buttonViewFormGradesSt = document.getElementById('studentGrades');
const buttonCloseModal = document.getElementById('closeModal');
const buttonSubmitModal = document.getElementById('button_modal');

const modal = document.getElementById('modalForm');

// Arreglo con elementos pre-cargados
const arrayStudents = [
    { name: "Esteban Quito", email: "estebanquito@ejemplo.com.ar", dni: "44234234", phone: "2235234567", age: 20, subject: 'Programación' },
    { name: "Ana Pérez", email: "anaperez@ejemplo.com", dni: "12345678", phone: "2235234567", age: 22 }
];

// Botón correspondiente a cuando le damos a 'enviar'
buttonSubmitForm.addEventListener('submit', (event) => {
    // Evita recargar la página cuando le doy click al botón submit. (Lo necesito para que no me vacie el array de manera inesperada).
    event.preventDefault();

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

    if(event) {
        alert('¡Formulario enviado con éxito!');
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
buttonViewStudents.addEventListener('click', (event) => {
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
            <button id='buttonDetelete'> ${'Eliminar'} </button>
            <button id='buttonViewSubject'> ${'Ver materias'} </button>
        `;

        tbody.appendChild(row);
    });
});

// Botón correspondiente a cuando le damos a 'volver al formulario'
buttonReturnForm.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.flip-card').classList.remove('flipped');
});

// Abrir el modal al hacer clic en 'Agregar notas'
buttonViewFormGradesSt.addEventListener('click', (event) => {
    event.preventDefault();

    // Muestra el moda, cambia el display de 'hidden' a 'block'
    modal.style.display = 'block'; 

    // Obtengo los valores de cada valor del form del modal
    const selectSt = document.getElementById('selectNameSt');
    const nameInput = document.getElementById('name_modal');
    const dniInput = document.getElementById('dni_modal');
    const subjectInput = document.getElementById('subject');
    const qualificationInput = document.getElementById('qualification');
    const submitButton = document.getElementById('button_modal');

    selectSt.innerHTML = '';

    // Recorro el arreglo y le seteo los nombres que tenga cargado en el arreglo
    arrayStudents.forEach(res => {
        const optionElement = document.createElement('option');
        optionElement.value = res.name;
        optionElement.textContent = res.name;
        selectSt.appendChild(optionElement);
    });

    // Manejador de cambio para el <select> -> Cuando 'cambio' de opción y elijo cualquier otro nombre entra acá
    selectSt.addEventListener('change', (event) => {
        // Obtengo el nombre que eligió
        const selectedName = event.target.value;

        // De los estudiantes solo dame el que el coincida con 'selectedName' 
        const selectedStudent = arrayStudents.find(student => student.name === selectedName);

        // Sí hay un elemento seleccionado recupero los valores del arreglo y elimino el deshabilitado de los inputs. 
        if (selectedStudent) {
            nameInput.value = selectedStudent.name;
            dniInput.value = selectedStudent.dni;

            subjectInput.disabled = false;
            qualificationInput.disabled = false;
            submitButton.disabled = false;
        } 
    });
});

// Cerrar el modal al hacer clic en la 'x'
buttonCloseModal.addEventListener('click', () => {
    modal.style.display = 'none'; 
});

// Botón correspondiente a cuando le damos a 'cargar' dentro del modal
buttonSubmitModal.addEventListener('submit', (event) => {
    event.preventDefault();

    const subject = document.getElementById('subject');
    const qualification = document.getElementById('qualification');


})


