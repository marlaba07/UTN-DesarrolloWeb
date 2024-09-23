const GetUsers = () => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("GET", `${API_URL}/users`, true );
        req.responseType = 'json';
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error("Hubo un error al obtener los usuarios: " + req.responseText))
        }

        req.onerror = () => reject(Error('Error de red'));
        req.send();
    })
}
