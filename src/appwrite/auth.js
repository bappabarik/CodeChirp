import conf from "@/conf/conf";
import { Client, Account, OAuthProvider } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async login(){
        try {
            await this.account.createOAuth2Session(
                OAuthProvider.Github, // provider
                'http://localhost:5173/login', // redirect here on success
                'http://localhost:5173/login', // redirect here on failure
                ['repo', 'user'] // scopes (optional)
            );
            
            return this.account.getSession('current')

        } catch (error) {
            console.log("AuthService :: Login :: ", error);
            return null
        }
    }

    async getCurrentUser(){
        try {
            const pref = await this.account.getPrefs()
            if (!pref.avatar) {
                const session = await this.account.getSession('current')
                const avatarURL = `https://avatars.githubusercontent.com/u/${session.providerUid}`
                await this.account.updatePrefs({'avatar': avatarURL})
            }
            const session = await this.account.getSession('current')
            const user = await this.account.get()
            user.targets[0].providerId = session.providerUid
            return user
            
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: ", error); 
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

      
    
}

const authService = new AuthService();

export default authService

