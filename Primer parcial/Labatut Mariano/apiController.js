const getCareers = async () => {
    try {
        const res = GetCareers();
        return res;
    } catch (err) {
        console.log("🚀 ~ getCareers ~ err:", err);
        throw err;
    }
}

const getStudents = async () => {
    try {
        const res = GetStudents();
        return res;
    } catch (err) {
        console.log("🚀 ~ getStudents ~ err:", err);
        throw err;
    }
}

const deleteStudent = async (id) => {
    try {
        const res = DeleteStudent(id);
        return res;
    } catch (error) {
        console.log("🚀 ~ deleteStudent ~ error:", error);
        throw error;
    }
}

