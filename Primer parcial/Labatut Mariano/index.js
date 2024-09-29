const joinResponseHTTP = async () => {
    const careers = await getCareers();
    const students = await getStudents();
    
    const updateStudents = students.map(st => {

        const career = careers.find(res => {
            return st.careerId === res.careerId; 
        });
        
        return { 
            ...st, 
            careerName: career?.name || '-'
        };
    });

    sortArray(updateStudents);

    return updateStudents;
}

const renderTable = async () => {
    let listSt = await joinResponseHTTP();

    const tbody = document.getElementsByTagName('tbody')[0];

    for (let student of listSt) {

        if (student.careerId === null || student.active === false) {
            continue;
        }

        const row = document.createElement('tr');

        Object.keys(student).forEach(prop => {
            if (prop !== "careerId") {
                const td = document.createElement('td');
                td.innerHTML = student[prop];
                row.appendChild(td);
            }
        });

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = "DELETE";
        btn.onclick = () => {
            deleteStudent(student.studentId);
            alert('Estudiante eliminado correctamente!');
            location.reload(); 
        };

        row.appendChild(btn);
        tbody.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', async () => { 
    await renderTable();
})