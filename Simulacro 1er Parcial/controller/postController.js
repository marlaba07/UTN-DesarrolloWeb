const getPosts = async () => {
    try {
        const res = await GetPosts();
        return res;
    } catch (error) {
        console.log("🚀 ~ getPost ~ error:", error)
        throw error;
    }
}

const getPost = async id => {
    try {
        const res = await GetPost(id);
        return res;
    } catch (error) {
        console.log("🚀 ~ getPost ~ error:", error)
        throw error;
    }
}

const addPost = async data => {
    try {
        const res = await AddPost(data);
        return res;
    } catch (error) {
        console.log("🚀 ~ addPost ~ error:", error)
        throw error;
    }
}

const deletePost = async id => {
    try {
        const res = await DeletePost(id);
        return res;
    } catch (error) {
        console.log("🚀 ~ deletePost ~ error:", error)
        throw error;
    }
}