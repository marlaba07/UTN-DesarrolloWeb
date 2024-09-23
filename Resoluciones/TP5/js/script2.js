const baseURL = 'https://utn-lubnan-api-1.herokuapp.com/api';

const hitEndPoint = (method, url) => {
    return new Promise( (resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        if (method === "POST") {
            request.setRequestHeader('Content-Type', 'application/json');
            request.onload = () => {
                if(request.status >= 200 && request.status < 300)
                    resolve(request.response);
                else
                    reject(Error(`${request.status}: ${request.statusText}`));
            };

        } else {
            request.responseType = 'json';
            request.onload = () => {
                if(request.status >= 200 && request.status < 300)
                    resolve(request.response);
                else
                    reject(Error(`${request.status}: ${request.statusText}`));
            };
        }

        request.onerror = () => {
            reject("Fallo en la matrix");
        };

        const body = {
            employeeId: 0,
            companyId: document.getElementById('companies').selectedIndex + 1,
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value
        };

        request.send(JSON.stringify(body));
    });
};

const getEmployees = (baseURL) => {
    return hitEndPoint("GET", baseURL+'/Employee');
};


const getCompanies = (baseURL) => {
    return hitEndPoint("GET", baseURL+'/Company');
};

const deleteEmployee = (baseURL, id) => {
    hitEndPoint("DELETE", `${baseURL}/Employee/${id}`);
};

const renderTable = async (baseURL) => {
    let fullList = await bringData(baseURL);

    const tbody = document.getElementsByTagName('tbody')[0];

    for(let emp of fullList) {
        const row = document.createElement('tr');

        Object.keys(emp).forEach( prop => {
            if(prop !== "companyId") {
                const td = document.createElement('td');
                td.innerHTML = emp[prop];
                row.appendChild(td);
            }
        });

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = "DELETE";
        btn.onclick = () => {
            deleteEmployee(baseURL, emp.employeeId);
        };

        row.appendChild(btn);

        tbody.appendChild(row);
    }
    
};

const renderForm = async (baseURL) => {
    document.getElementById("companies").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    
    let companies = await getCompanies(baseURL);

    let select = document.getElementById('companies');
    
    for(let comp of companies) {
        let option = document.createElement('option');
        option.id = comp.companyId;
        option.innerText = comp.name;
        select.appendChild(option);
    }
};

const bringData = async (baseURL) => {
    const employees = await getEmployees(baseURL);
    const companies = await getCompanies(baseURL);

    employees.forEach(emp => {
        let company = companies.find( comp => {
            if(emp.companyId === comp.companyId) return true;
        });
        emp.companyName = company?.name || "No company";
    });

    return employees;
};

document.addEventListener('DOMContentLoaded', async () => {
    await renderForm(baseURL);
    await renderTable(baseURL);
    const addBtn = document.getElementById('addBtn');
    addBtn.onclick = () => {
        hitEndPoint("POST", baseURL + '/Employee');
    };
});