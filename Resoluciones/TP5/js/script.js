const urlBase = `https://utn-lubnan-api-1.herokuapp.com/api`;

//Hit a endpoint, only for get and delete methods.
function hitEndPoint(url, method) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.responseType = "json";
    request.open(method, url);
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      } else {
        reject(request.statusText);
      }
    };
    request.onerror = () => reject(request.statusText);
    request.send();
  });
}

function deleteRequest(url) {
  hitEndPoint(url, "DELETE");
}

//POST /Employee method, request.open is way too different to abract it in a single method(like hit endpoit)
const addEmployee = async () => {
  var request = new XMLHttpRequest();
  // request.open("POST", `${urlBase}/Employee`);
  request.open("POST", urlBase + '/Employee');
  request.setRequestHeader("Content-Type", "application/json");

  // request.onreadystatechange = function () {
  //   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
  //   }
  // };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      resolve(request.response);
    } else {
      reject(request.statusText);
    }
  };

  const body = {
    employeeId: 0,
    companyId: document.getElementById("companies").selectedIndex,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value
  };
  
  request.send(JSON.stringify(body));
};

//Get companies
function getCompanies() {
  return hitEndPoint(`${urlBase}/Company`, "GET");
}

//Get employees
function getEmployees() {
  return hitEndPoint(`${urlBase}/Employee`, "GET");
}

//Render the add Employee form in the DOM.
const renderForm = async () => {

  document.getElementById("companies").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";

  // const companies = await getCompanies();

  // companies.forEach( (company) => {
  //   let optionComp = document.createElement("option");
  //   optionComp.id = company.companyId;
  //   optionComp.text = company.name;
  //   document.getElementById("companies").appendChild(optionComp);
  // });

  getCompanies()
    .then(companies => {
      for(let comp of companies) {
        let optionComp = document.createElement("option");
        optionComp.id = comp.companyId;
        optionComp.text = comp.name;
        document.getElementById("companies").appendChild(optionComp);
      }
    })
    .catch();
};

//Render the table rows in the DOM.
function renderRows(response) {

  const table = document
  // .getElementById("table")
  .getElementsByTagName("tbody")[0];
  
  while (table.firstChild) table.removeChild(table.firstChild);

  response.forEach( (employee) => {
    const row = table.insertRow(-1);

    var employeeId = row.insertCell(-1);
    employeeId.innerHTML = employee.employeeId;

    var firstName = row.insertCell(-1);
    firstName.innerHTML = employee.firstName;

    var lastName = row.insertCell(-1);
    lastName.innerHTML = employee.lastName;

    var companyName = row.insertCell(-1);
    companyName.innerHTML = employee.companyName;

    var email = row.insertCell(-1);
    email.innerHTML = employee.email;

    var delButton = row.insertCell(-1);
    delButton.innerHTML =
      '<button  class="btn btn-secondary btn-xs my-xs-btn" type="button">' +
      '<span class="glyphicon glyphicon-pencil"></span> Delete </button>';
    delButton.onclick = function () {
      deleteEmployee(employee.employeeId);
    };
  });
}

//Hit get endpoints and merge the arrays, this method is called to update the ui when a change is performed.
const bringData = async () => {
  const companies = await getCompanies();
  const employees = await getEmployees();

  //mapping two arrays
  const employeesComplete = await employees.map( (employee, i) => {

    // validation that the companyid exists 
    if (companies[employee.companyId] !== undefined) {
      employee.companyName = companies[employee.companyId].name;
    } else {
      employee.companyName = "no company";
    }

    return employee;
  });

  return employeesComplete;
};

//Hit the delete employee endpoint and refresh the ui.
const deleteEmployee = async (employeeId) => {
  deleteRequest(`${urlBase}/Employee/${employeeId}`);
  // deleteRequest(urlBase + '/Employee/' + employeeId);
  renderRows(await bringData());
};

//Window load, render the ui for the first time.
window.onload = async () => {
  await renderForm();
  renderRows(await bringData());
  const addBtn = document.getElementById("addBtn");
  addBtn.onclick = async () => {
    await addEmployee();
    await renderForm();
    renderRows(await bringData());
  };
};

/*
Notice that some of the functions are declared as the following structure.
  const someVar = (async () => {
    ...functionality
  });
this is a very flexible way to handle functions as values, cause after that declaration you can 
simply call the function as "somevar();"
it's just another way to handle functions in js.
*/