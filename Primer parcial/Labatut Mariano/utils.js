const sortArray = (data) => {
    data.sort((a, b) => {
        const lastNameA = a.lastName.toUpperCase(); 
        const lastNameB = b.lastName.toUpperCase(); 

        if (lastNameA < lastNameB) return -1;
        if (lastNameA > lastNameB) return 1;
        
        return 0;
    });
}