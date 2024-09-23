// Esta función fusiona ambas peticiones devolviendo un array con los empleados que coincidan con sus empresas respectivas. 
const joinResponseHTTP = async () => {
    const companies = await getCompanies()
    const employees = await getEmployees()

    const updatedEmployees = employees.map(emp => {

        const company = companies.find(comp => {
            emp.companyId === comp.companyId
        })

        return {
            ...emp,
            companyName: company?.name || '-' 
        };
    });

    return updatedEmployees;   
}

// Esta función muestra la tabla con toda la información en el DOM. 
const renderTable = async () => {
    let list = await joinResponseHTTP();
    
    const tbody = document.getElementsByTagName('tbody')[0];

    for(let emp of list){
        const row = document.createElement('tr')

        Object.keys(emp).forEach( prop => {
            if(prop !== "companyId") {
                const td = document.createElement('td')
                td.innerHTML = emp[prop]
                row.appendChild(td)
            }
        })

        const btn = document.createElement('button')
        btn.tpye = 'button'
        btn.innerHTML = "DELETE"
        btn.className = 'btn btn-danger';
        btn.onclick = () => {
            deleteEmployee(emp.employeeId)
            alert('Empleado eliminado correctamente!')
            location.reload(); 
        };

        row.appendChild(btn);
        tbody.appendChild(row);
    }
}

// Esta función se encarga de la parte del envio de la información del formulario.
const sendForm = async () => {
    const employeeData = {
        employeeId: 0,  // Suponiendo que lo generas automáticamente en el backend
        companyId: document.getElementById('companies').selectedIndex,
        firstName: document.getElementById('nameEmployee').value,
        lastName: document.getElementById('lastNameEmployee').value,
        email: document.getElementById('emailEmployee').value
    };

    addEmployees(employeeData);
    alert('Empleado agregado correctamente!')
}

// Limpia los campos del formulario e inicia el select con opciones de empresas existentes de la API. 
const renderForm = async () => {
    document.getElementById('companies').value = ""
    document.getElementById('nameEmployee').value = ""
    document.getElementById('lastNameEmployee').value = ""
    document.getElementById('emailEmployee').value = ""

    let companies = await getCompanies();
    let select = document.getElementById("companies");

    companies.forEach((data) => {
        let option = document.createElement('option');
        option.id = data.companyId;
        option.innerHTML = data.name;
        select.appendChild(option);
    })
}   

// Lo que esté adentro, se ejecutará tan pronto como el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', async () => {
    await renderTable();
    await renderForm();
})



