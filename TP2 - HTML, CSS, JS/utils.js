function calculateAge(birthdate){
    const currentYear = new Date().getFullYear(); 
    const yearOfBirth = new Date(birthdate).getFullYear(); 

    return currentYear - yearOfBirth; 
}

function sortArray(){
    arrayStudents.sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1
        return 0;   
    })
}

