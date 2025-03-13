import conf from "@/conf/conf";
import { Client, Databases } from "appwrite";

export class DbService{
    client = new Client();
    databases;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
    }

    async storeGithubAppData(providerId, {installationID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCodeChirpGithubAppCollectionId,
                providerId,
                {
                    installationID       
                }
            )
        } catch (error) {
            console.log("DbService :: storeGithubAppData ::", error)
            return null;
        }
    }

    async getGithubAppData(providerId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCodeChirpGithubAppCollectionId,
                providerId
            )
        } catch (error) {
            console.log("DbService :: getGithubAppData ::", error)
            return null;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePostCollectionId,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
}

const dbService = new DbService()

export default dbService;