const api = 'https://utn-lubnan-api-2.herokuapp.com/api'

const GetCareers = () => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("GET", `${api}/career`, true);
        req.responseType = 'json';
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error("Error al obtener las carreras" + req.statusText))
        }

        req.onerror = () => reject(Error('Error de servidor'));
        req.send();
    })
}

const GetStudents = () => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("GET", `${api}/student`, true);
        req.responseType = 'json';
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error("Error al obtener los estudiantes" + req.statusText))
        }

        req.onerror = () => reject(Error('Error de servidor'));
        req.send();
    })
}

const DeleteStudent = (id) => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("DELETE", `${api}/student/${id}`, true);
        req.responseType = 'json';
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error("Error al eliminar el estudiante" + req.statusText))
        }

        req.onerror = () => reject(Error('Error de servidor'));
        req.send();
    })
}
