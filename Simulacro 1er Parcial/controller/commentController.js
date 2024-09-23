const getComments = async () => {
    try {
        const res = await GetComments();
        return res;
    } catch (error) {
        console.log("🚀 ~ getComments ~ error:", error)
        throw error;
    }
}

const getCommentPost = async (id) => {
    try {
        const res = await GetCommentPost(id);
        return res;
    } catch (error) {
        console.log("🚀 ~ getCommentPost ~ error:", error)
        throw error;
    }
}