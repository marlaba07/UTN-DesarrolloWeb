const getEmployees = () => {
    const url = 'https://utn-lubnan-api-1.herokuapp.com/api/Employee'

    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();

        // request.timeout = 5000;
        request.open('GET', url, true);
        request.onload = function () {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                resolve(data);
            } else reject(Error('Ocurrió un error al traer los empleados. ' + request.statusText));
        };

        request.onerror = function () {
            reject(Error('Error de red'));
        };

        // request.ontimeout = function () {
        //     reject(Error('La solicitud ha tardado demasiado tiempo'));
        // };

        request.send();
    })
}

const getCompanies = () => {
    const url = 'https://utn-lubnan-api-1.herokuapp.com/api/Company'

    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();

        // request.timeout = 5000;
        request.open('GET', url, true);
        request.onload = function () {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                resolve(data);
            } else reject(Error('Ocurrió un error al traer las empresas. ' + request.statusText));
        };

        request.onerror = function () {
            reject(Error('Error de red'));
        };

        // request.ontimeout = function () {
        //     reject(Error('La solicitud ha tardado demasiado tiempo'));
        // };

        request.send();
    })
}
 

