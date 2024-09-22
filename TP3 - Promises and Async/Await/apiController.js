const getEmployees = async () => {
    try {
        const res = await GetEmployees();
        return res;
    } catch(error) {
        console.log("🚀 ~ getEmployees ~ error:", error);
        throw error;
    }
}

const deleteEmployee = async id => {
    try {
        const res = await DeleteEmployee(id);
        return res;
    } catch(error) {
        console.log("🚀 ~ deleteEmployee ~ error:", error);
        throw error;
    }
}

const addEmployees = async (data) => {
    try {
        const res = await AddEmployees(data);
        return res;
    } catch(error) {
        console.log("🚀 ~ addEmployees ~ error:", error);
        throw error;
    }
}

const getCompanies = async () => {
    try {
        const res = await GetCompanies();
        return res;
    } catch (error){
        console.log("🚀 ~ getCompanies ~ error:", error);
        throw error;
    }
}