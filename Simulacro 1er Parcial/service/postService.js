const GetPosts = () => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("GET", `${API_URL}/posts`, true);
        req.responseType = 'json';
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error("Hubo un error al obtener los posts: " + req.responseText))
        }

        req.onerror = () => reject(Error('Error de red'));
        req.send();
    })
}

const GetPost = (id) => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("GET", `${API_URL}/posts/${id}`, true);
        req.responseType = 'json';
        req.onload = () => {
            req.status <= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error('Hubo un error al obtener el post solicitado: ' + req.responseText))
        }

        req.onerror = () => reject(Error('Error de red'));
        req.send();
    })
}

const AddPost = (data) => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("POST", `${API_URL}/posts`);
        req.setRequestHeader("Content-Type", "application/json;charset-UTF-8");
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error('Hubo un error al agregar un nuevo post: ' + req.responseText))
        }

        req.onerror = () => reject(Error('Error de red'));
        req.send(data);
    })
}

const DeletePost = (id) => {
    const req = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        req.open("DELETE", `${API_URL}/posts/${id}`);
        req.responseType = 'json';
        req.onload = () => {
            req.status >= 200 && req.status < 300
                ? resolve(req.response)
                : reject(Error('Hubo un problema al eliminar el post: ' + req.responseText))
        }

        req.onerror = () => reject(Error('Error de red'));
        req.send();
    })
}
