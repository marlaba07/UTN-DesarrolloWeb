const getPhotos = async () => {
    try {
        const res = await GetPhotos();
        return res; 
    } catch (error) {
        console.log("🚀 ~ getPhotos ~ error:", error);
        throw error;
    }
}
