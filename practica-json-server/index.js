const url = 'http://localhost:3000';

const getClients = () => {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('GET', `${url}/clients`, true);
        xhr.responseType = 'json';
        xhr.onload = () => {
            xhr.status >= 200 && xhr.status < 300
                ? resolve(xhr.response)
                : reject(Error(xhr.statusText))
        }

        xhr.onerror = () => reject(Error('Error de red'));
        xhr.send();
    })
}

const addClient = (newClient) => {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('POST', `${url}/clients`, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset-UTF-8');
        xhr.onload = () => {
            xhr.status >= 200 && xhr.status < 300
                ? resolve(xhr.response)
                : reject(Error(xhr.statusText))
        }

        xhr.onerror = () => reject(Error('Error de red'));
        xhr.send(JSON.stringify(newClient));
    })
}


const deleteClient = (clientId) => {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('DELETE', `${url}/clients/${clientId}`, true);
        xhr.onload = function () {
            xhr.status >= 200 && xhr.status < 300
                ? resolve(xhr.response)
                : reject(Error(xhr.statusText));
        }

        xhr.onerror = () => reject(Error('Error de red'));
        xhr.send();
    });
}

// ----------------------------------------------------------------

const renderTable = async () => {
    const clients = await getClients();
    const tbody = document.getElementsByTagName('tbody')[0];

    for (let cli of clients) {
        const row = document.createElement('tr');

        Object.keys(cli).forEach(prop => {
            const td = document.createElement('td');
            td.innerHTML = cli[prop];
            row.appendChild(td);
        });

        const btnTd = document.createElement('td');
        const btn = document.createElement('button');

        btn.type = 'button';
        btn.innerHTML = "DELETE";
        btn.className = 'btn btn-danger';
        btn.onclick = () => {
            deleteClient(cli.id);
            alert('Cliente eliminado correctamente!');
            location.reload();
        };

        btnTd.appendChild(btn);
        row.appendChild(btnTd);
        tbody.appendChild(row);
    }
};

const sendForm = async () => {
    const clients = await getClients();
    const lastClientId = clients.length ? parseInt(clients[clients.length - 1].id, 10) : 0;  // Convierte el ID a número

    const data = {
        id: lastClientId + 1,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value
    };

    await addClient(data);
    alert('Cliente agregado correctamente!');
    location.reload();
};



const renderForm = async () => {
    document.getElementById('first_name').value = ""
    document.getElementById('last_name').value = ""
    document.getElementById('email').value = ""
    document.getElementById('country').value = ""
}

// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    await renderTable();
    await renderForm();
});


