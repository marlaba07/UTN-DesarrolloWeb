const baseURL = 'https://utn-lubnan-api-1.herokuapp.com/api';

//* Generic request for GET POST & DELETE
const hitEndpoint = (method, url) => {
    return new Promise( (resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);

        if(method === "POST") request.setRequestHeader('Content-Type', 'application/json');
        else request.responseType = 'json';

        // (method === "POST") ? request.getResponseHeader('Content-Type', 'application/json') : request.responseType = 'json';

        request.onload = () => {
            if(request.status >= 200 && request.status < 300) resolve(request.response);
            else reject(Error(`${request.status}: ${request.statusText}`)); 
        };
        
        request.onerror = () => {
            reject(Error('Network Error'));
        };
        
        const body = {
            employeeId: 0,
            companyId: document.getElementById('companies').selectedIndex,
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            email: document.getElementById('email').value
          };
        request.send(JSON.stringify(body));
    });
};

const getCompanies = async (baseURL) => {
    return await hitEndpoint("GET", `${baseURL}/Company`);
};

const getEmployees = async (baseURL) => {
    return await hitEndpoint("GET", `${baseURL}/Employee`);
};

const deleteEmployee = (baseURL, employeeId) => {
    hitEndpoint("DELETE", `${baseURL}/Employee/${employeeId}`);
};

const addEmployee = (baseURL) => {
    hitEndpoint("POST", `${baseURL}/Employee`);
};

// const getData = async(baseURL, endpoint) => {
//     return await hitEndpoint("GET", `${baseURL}/${endpoint}`);
// }

const renderForm = (baseURL) => {
    // const list = await getCompanies(baseURL);
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('companies').value = "";

    getCompanies(baseURL)
        .then(companyList => {
            const dropdown = document.getElementById('companies');
            companyList.forEach(company => {
                let option = document.createElement('option');
                option.id = company.companyId;
                option.innerHTML = company.name;
                dropdown.appendChild(option);
            });
        })
        .catch(console.log);

};

const bringData = async(baseURL) => {
    const companies = await getCompanies(baseURL);
    const employees = await getEmployees(baseURL);

    for(let employee of employees) {
        let company = companies.find(company => {
            if(company.companyId === employee.companyId) return true;
        });
        // console.log(company.name);
        
        // employee.companyName = company?.name || "No company";

        if(company.name) employee.companyName = company.name;
        else employee.companyName = "No company";
    }
    // 0, false, null, undefined
    return employees;
};

// renderForm(baseURL);

const renderTable = async(baseURL) => {
    const employees = await bringData(baseURL);
    const tbody = document.getElementById('tableBody');
  
    employees.forEach( emp => {
        const row = document.createElement('tr');

        for(let prop in emp) {
            if(prop !== "companyId") {
                let td = document.createElement('td');
                td.innerText = emp[prop];
                row.appendChild(td);
            }
        }

        let button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'DELETE';
        button.onclick = () => {
            deleteEmployee(baseURL, emp.employeeId);
        };
        row.appendChild(button);
        tbody.appendChild(row)
    });
};

document.addEventListener('DOMContentLoaded', async() => {
    await renderForm(baseURL);
    await renderTable(baseURL);
    const addBtn = document.getElementById('addBtn');
    addBtn.onclick = async() => {
        await addEmployee(baseURL);
        await renderForm(baseURL);
    }
});