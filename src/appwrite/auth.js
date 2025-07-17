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
                conf.callbackUrl, // redirect here on success
                conf.failureUrl, // redirect here on failure
                ['repo', 'user'] // scopes (optional)
            );

        } catch (error) {
            console.log("AuthService :: Login :: ", error);
            return null
        }
    }

async getCurrentUser() {
    try {
        // Check if session exists
        const session = await this.account.getSession('current');

        // Get user prefs and update avatar if needed
        const pref = await this.account.getPrefs();
        if (!pref.avatar && session.providerUid) {
            const avatarURL = `https://avatars.githubusercontent.com/u/${session.providerUid}`;
            await this.account.updatePrefs({ avatar: avatarURL });
        }

        const user = await this.account.get();
        if (user.targets && user.targets[0]) {
            user.targets[0].providerId = session.providerUid;
        }

        return user;
    } catch (error) {
        console.log("AuthService :: getCurrentUser :: ", error);
        return null;
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

