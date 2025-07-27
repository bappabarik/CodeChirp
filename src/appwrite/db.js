import conf from "@/conf/conf";
import { getToken, messaging } from "@/firebase";
import { Client, Databases, ID, Query } from "appwrite";

export class DbService {
  client = new Client();
  databases;
  postSubscription;
  gitHubAppSubscription;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.postSubscription = null;
    this.gitHubAppSubscription = null;
  }

  async storeGithubAppData(providerId, { installationID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCodeChirpGithubAppCollectionId,
        providerId,
        {
          installationID,
        }
      );
    } catch (error) {
      console.log("DbService :: storeGithubAppData ::", error);
      return null;
    }
  }

  async getGithubAppData(providerId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCodeChirpGithubAppCollectionId,
        providerId
      );
    } catch (error) {
      console.log("DbService :: getGithubAppData ::", error);
      return null;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(providerId, app, limit = null, cursor = null) {
    try {
      const queries = [
        Query.orderDesc("$createdAt"),
        Query.equal("providerID", providerId),
        Query.equal("app", app),
      ];
      if (limit) queries.push(Query.limit(10));
      if (cursor) queries.push(Query.cursorAfter(cursor));

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async updatePost(id, post) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        id,
        post
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  subscribeToPosts(providerId, App, callback) {
    this.postSubscription = this.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostCollectionId}.documents`,
      (response) => {
        // console.log("Realtime Update:", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          const { providerID, app } = response.payload;
          if (providerID === providerId && app === App) {
            callback(response.payload);
          } else {
            callback(null);
          }
        }
      }
    );
  }

  unsubscribeToPost() {
    if (this.postSubscription) {
      this.postSubscription();
    }
  }

  subscribeToGithubApp(providerId, callback) {
    this.gitHubAppSubscription = this.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCodeChirpGithubAppCollectionId}.documents`,
      (response) => {
        console.log("Realtime Update:", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          const { $id } = response.payload;
          if ($id === providerId) {
            callback(true);
            return;
          }
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          const { $id } = response.payload;
          if ($id === providerId) {
            callback(false);
            return;
          }
        }
      }
    );
  }

  unsubscribeToGithubApp() {
    if (this.gitHubAppSubscription) {
      this.gitHubAppSubscription();
    }
  }

  // save fcm token into db service
  async requestNotificationPermission(providerID, vapidKey) {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Notification permission not granted.");
        return;
      }

      const fcmToken = await getToken(messaging, { vapidKey });
      if (!fcmToken) {
        console.log("FCM token not available.");
        return;
      }

      const existingToken = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFirebaseCollectionId,
        [Query.equal("fcmToken", fcmToken)]
      );

      if (existingToken.documents.length === 0) {
        await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteFirebaseCollectionId,
          ID.unique(),
          {
            providerID,
            fcmToken,
          }
        );
      }
    } catch (error) {
      console.error("requestNotificationPermission ::", error);
    }
  }
}

const dbService = new DbService();

export default dbService;
