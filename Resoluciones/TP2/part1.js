// import { sortByLastname } from './helper';

const addForm = document.getElementById('addStudent');
const addNewBtn = document.getElementById('addNewBtn');
const studentList = [];

// console.log(addForm); //* Habilitar para ver las props de un ele HTML

addNewBtn.addEventListener('click', event => {
    if(!addForm.reportValidity()) return;
    
    let dni = document.getElementById('dni').value;
    // dniChecker(dni); //* Revisamos que el alumno no exista
    // if(dniChecker(dni)) throw new Error("El DNI ingresado ya existe");
    
    const bday = document.getElementById('bday').value;
    
    let age = calculateAge(bday); //* Calculamos la edad para saber si lo agregamos o no
    if(age < 18) throw new Error("El alumno debe ser mayor de 18 años");
    
    const auxArray = [];

    //* Nos traemos el form entero e iteramos sobre él
    for(let element of addForm) {
        if(element.tagName !== "BUTTON") auxArray.push(element.value); //* Filtramos los botones
    }

    auxArray.splice(4, 0, age); //* Insertamos la edad luego del cumpleaños

    studentList.push(auxArray);
    // console.log(studentList); //* Habilitar para ver la lista de students
    // addForm.reset(); //* Esto limpia el form luego de agregar cada alumno
    
});

addForm.addEventListener('submit', event => {
    event.preventDefault();  //* Previene que recargue el browser al clickear


    //* Ocultamos el formulario con el atributo "hidden"
    document.getElementsByClassName('formWrapper')[0].hidden = true;


    //! O podemos eliminarlo completamente
    // document.getElementsByClassName('formWrapper')[0].remove();
    sortByLastname();
    stdInfoTable(studentList); //* Rellenamos la tabla con la lista de studiantes
});

const stdInfoTable = (studentList) => {
    const table = document.createElement('table'); //* Creamos la tabla
    const thead = document.createElement('thead'); //* Y el header de la tabla
    
    table.id = "stdInfoTable";
    table.appendChild(thead); //* Insertamos el thead en la tabla
    document.getElementsByClassName('formWrapper')[0].after(table);
    // addForm.after(table); //* Y esta luego del form
    
    thead.innerHTML = `
        <th>DNI</th>
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Fecha de nacimiento</th>
        <th>Edad</th>
        <th>Email</th>
        <th>Teléfono</th>
    `; //* Creamos las cabeceras de las columnas usando un template literal

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    for(let student of studentList) { //* Recorremos la lista y por cada alumno creamos una fila
        const tr = document.createElement('tr');

        for (let element of student) {
            const td = document.createElement('td'); //* Por cada dato del alumno creamos una celda
            // console.log(element);
            td.innerHTML = element;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.innerHTML += `
        <tfoot>
            <tr>
                <td colspan="7">
                    <button type="button" id="part2Btn" onclick="partTwo()">Parte 2</button>
                </td>
            </tr>
        </tfoot>
    `;
    // const th = document.createElement('th');
};

