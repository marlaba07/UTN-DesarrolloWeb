const getUsers = async () => {
    try {
        const res = await GetUsers();
        return res; 
    } catch (error) {
        console.log("🚀 ~ getUsers ~ error:", error);
        throw error;
    }
}