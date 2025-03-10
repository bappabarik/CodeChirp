const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCodeChirpGithubAppCollectionId: String(import.meta.env.VITE_APPWRITE_CODECHIRP_GITHUBAPP_COLLECTION_ID),
    appwritePostCollectionId: String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID)
}

export default conf