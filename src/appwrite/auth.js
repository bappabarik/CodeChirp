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
            
            return await this.account.get()
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

    // async  checkGitHubAppInstallation(providerAccessToken) {
    //     try {
    //         const response = await fetch("https://api.github.com/user/installations", {
    //           method: "GET",
    //           headers: {
    //             Authorization: `Bearer ${providerAccessToken}`,
    //             Accept: "application/vnd.github+json"
    //           }
    //         });
          
    //         const data = await response.json();
          
    //         if (response.ok) {
    //           console.log("User's installed GitHub apps:", data);
    //           return data.total_count > 0 ? data.installations : null;
    //         } else {
    //           console.error("Error checking installation:", data);
    //           return null;
    //         }
    //     } catch (error) {
    //         console.log("ERROR :: checkGitHubAppInstallation ::", error);
            
    //     }
    //   }

    //   async isAppInstalled() {
    //     try {
    //         const session = await this.account.getSession('current')
    //         const providerAccessToken = session.providerAccessToken
    //         const installations = await this.checkGitHubAppInstallation(providerAccessToken);
          
    //         if (!installations) {
    //           console.log("No GitHub apps installed.");
    //           return false;
    //         }
          
    //         const isInstalled = installations.some(install => install.account.login === 'CodeChirp');
          
    //         console.log(`Is CodeChirp installed?`, isInstalled);
    //         return isInstalled;
    //     } catch (error) {
    //         console.log("ERROR :: isAppInstalled ::", error);
    //     }
    //   }
      
      
    
}

const authService = new AuthService();

export default authService

