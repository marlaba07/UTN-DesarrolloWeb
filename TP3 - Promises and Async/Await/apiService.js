const url = 'https://utn-lubnan-api-1.herokuapp.com/api';
 
const GetEmployees = () => {
    const request = new XMLHttpRequest();
    return new Promise( (resolve, reject) => {
        request.open('GET', `${url}/Employee`, true);
        request.responseType = 'json';
        request.onload = () => {
            request.status === 200
                ? resolve(request.response)
                : reject(Error('Ocurrió un error al traer los empleados. ' + request.statusText))
        };

        request.onerror = () => reject(Error('Error de red'));
        request.send();
    })
}

const AddEmployees = (employeeData) => {
    const request = new XMLHttpRequest();
    return new Promise( (resolve, reject) => {
        request.open("POST", `${url}/Employee`, true);
        request.setRequestHeader("Content-Type", "application/json;charset-UTF-8");
        request.onload = () => {
            request.status >= 200 && request.status <= 300
                ? resolve(request.response)
                : reject(Error('Ocurrió un error al crear un empleado. ' + request.statusText))
        }

        request.onerror = () => reject(Error('Error de red'));
        request.send(JSON.stringify(employeeData));
    })
}

const DeleteEmployee = (employeeId) => {
    const request = new XMLHttpRequest();
    return new Promise( (resolve, reject) => {
        request.open("DELETE", `${url}/Employee/${employeeId}`);
        request.onload = () => {
            request.status >= 200 && request.status <= 300
                ? resolve(request.response)
                : reject(Error('No se pudo eliminar el empleado! ' + request.statusText))
        }

        request.onerror = () => reject(Error('Error de red'));
        request.send();
    })
}

const GetCompanies = () => {
    const request = new XMLHttpRequest();
    return new Promise( (resolve, reject) => {
        request.timeout = 10000;
        request.open('GET', `${url}/Company`, true);
        request.responseType = 'json';
        request.onload = () => {
            request.status >= 200 && request.status <= 300
                ? resolve(request.response)
                : reject(Error('Ocurrió un error al traer las empresas. ' + request.statusText))
        };

        request.onerror = () => reject(Error('Error de red'));
        request.ontimeout = () => reject(Error('La solicitud ha tardado demasiado tiempo'));
        request.send();
    })
}



 

