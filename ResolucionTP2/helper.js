const sortByLastname = () => {
    studentList.sort( (a, b) => {
        if(a < b) return -1; //* En Mozilla Developer ordena
        if(a > b) return 1;
        // if(a[1] < b[1]) return -1;
        // if(a[1] > b[1]) return 1;
        
        return 0;
    });
};

const dniChecker = (dni) => {
    studentList.forEach( std => {
        if(std[0] === dni) throw new Error("El DNI ingresado ya existe");
    }); //* Comparamos el nuevo DNI con el DNI de todos los alumnos existentes
    // return studentList.includes(dni);
};

const calculateAge = (birthday) => {
    /* //* Esta es la forma "larga" de hacer lo que está en la linea 29
    let currentDate = new Date();
    let birthDate = new Date(birthday);

    console.log(currentDate);
    console.log(birthDate);

    age = currentDate.getFullYear() - birthDate.getFullYear();
    
    return age;
    */
    return ((new Date().getFullYear()) - (new Date(birthday).getFullYear()));
};

const avgScore = (auxArray) => {
    
    let avg = parseInt(auxArray.at(-1)) + parseInt(auxArray.at(-2)) + parseInt(auxArray.at(-3));

    return (avg / 3).toFixed(2);
};