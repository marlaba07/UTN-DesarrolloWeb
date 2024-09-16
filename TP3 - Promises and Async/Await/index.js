const body = document.querySelector('body');

const btnGetAllEmployees = document.getElementById('btnGetAllEmployees');
const btnGetAllCompanies = document.getElementById('btnGetAllCompanies');

const handleGetEmployees = async () => {
    const resultContainerEmployees = document.getElementById('resultEmployees');

    btnGetAllEmployees.disabled = true;
    resultContainerEmployees.innerHTML = 'Cargando...';

    getEmployees()
        .then((employees) => {
            resultContainerEmployees.innerHTML = `<pre>${JSON.stringify(employees, null, 2)}</pre>`;
        })
        .catch((err) => {
            resultContainerEmployees.innerHTML = `Hubo un error al obtener los empleados: ${err.message}`;
        })
        .finally(() => {
            btnGetAllEmployees.disabled = false;
        });
};

const handleGetCompanies = async () => {
    const resultContainerCompanies = document.getElementById('resultCompanies');

    btnGetAllCompanies.disabled = true;
    resultContainerCompanies.innerHTML = 'Cargando...';

    getEmployees()
        .then((employees) => {
            resultContainerCompanies.innerHTML = `<pre>${JSON.stringify(employees, null, 2)}</pre>`;
        })
        .catch((err) => {
            resultContainerCompanies.innerHTML = `Hubo un error al obtener los empleados: ${err.message}`;
        })
        .finally(() => {
            btnGetAllCompanies.disabled = false;
        });
};

btnGetAllEmployees.addEventListener('click', handleGetEmployees);
btnGetAllCompanies.addEventListener('click', handleGetCompanies)