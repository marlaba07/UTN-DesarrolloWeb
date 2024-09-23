const getTodos = async () => {
    try {
        const res = await GetTodos();
        return res; 
    } catch (error) {
        console.log("🚀 ~ getTodos ~ error:", error);
        throw error;
    }
}