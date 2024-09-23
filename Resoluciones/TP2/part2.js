const dni2 = document.getElementById('dni2');
const lastname2 = document.getElementById('lastname2');
const firstname2 = document.getElementById('firstname2');
let counter = 0;


const partTwo = () => {
    document.getElementById('stdInfoTable').hidden = true;
    dni2.value = studentList[counter][0];
    lastname2.value = studentList[counter][1];
    firstname2.value = studentList[counter][2];
    document.getElementsByClassName('formWrapper')[1].hidden = false;
};

const scoresForm = document.getElementById('addScores');
const nextBtn = document.getElementById('nextStudent');
const stdScoreList = [];

nextBtn.addEventListener('click', event => {
    if(!scoresForm.reportValidity()) return;
    
    const auxArray = [];
    
    for(let element of scoresForm) {
        if(element.tagName !== "BUTTON") auxArray.push(element.value); //* Filtramos los botones
    }
    const avg = avgScore(auxArray);
    auxArray.push(avg);

    stdScoreList.push(auxArray);
    console.log(stdScoreList);
    
    counter++;
    if(counter === studentList.length) {
        alert('Todos los alumnos han sido cargados');
        nextBtn.disabled = true;
    } else {
        dni2.value = studentList[counter][0];
        lastname2.value = studentList[counter][1];
        firstname2.value = studentList[counter][2];
    }
});

scoresForm.addEventListener('submit', event => {
    event.preventDefault();  //* Previene que recargue el browser al clickear


    //* Ocultamos el formulario con el atributo "hidden"
    document.getElementsByClassName('formWrapper')[1].hidden = true;


    //! O podemos eliminarlo completamente
    // document.getElementsByClassName('formWrapper')[1].remove();
    stdScoreTable(stdScoreList); //* Rellenamos la tabla con la lista de studiantes
});

const stdScoreTable = (studentList) => {
    const table = document.createElement('table'); //* Creamos la tabla
    const thead = document.createElement('thead'); //* Y el header de la tabla
    
    table.id = "stdInfoTable";
    table.appendChild(thead); //* Insertamos el thead en la tabla
    document.getElementsByClassName('formWrapper')[1].after(table);
    // addForm.after(table); //* Y esta luego del form
    
    thead.innerHTML = `
        <th>DNI</th>
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Matemática</th>
        <th>Literatura</th>
        <th>Química</th>
        <th>Promedio</th>
    `; //* Creamos las cabeceras de las columnas usando un template literal

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    for(let student of stdScoreList) { //* Recorremos la lista y por cada alumno creamos una fila
        const tr = document.createElement('tr');

        for (let element of student) {
            const td = document.createElement('td');
            // console.log(element);
            td.innerHTML = element;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // const th = document.createElement('th');
};