const getAlbums = async () => {
    try {
        const res = await GetAlbums();
        return res;
    } catch (error) {
        console.log("🚀 ~ getAlbums ~ error:", error)
        throw error;
    }
}

