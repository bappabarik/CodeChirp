const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCodeChirpGithubAppCollectionId: String(import.meta.env.VITE_APPWRITE_CODECHIRP_GITHUBAPP_COLLECTION_ID),
    appwritePostCollectionId: String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID),
    appwriteFirebaseCollectionId: String(import.meta.env.VITE_APPWRITE_FIREBASE_COLLECTION_ID),
    callbackUrl: String(import.meta.env.VITE_INSTALLATION_CALLBACK_URL),
    failureUrl: String(import.meta.env.VITE_INSTALLATION_FAILURE_URL),
    firebaseApiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
    firebaseMessagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID),
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APPID),
    firebaseMeasurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENTID),
}

export default conf