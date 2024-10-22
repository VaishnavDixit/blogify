import {Client, Databases, Query, Storage} from "appwrite";
import conf from "../conf/conf.js";
import authService from "./auth.js";

//it's just database service
export class UserDataService {
    client;
    databases;
    bucket; // storage
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    createUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            if (userData) {
                const id = userData.$id;
                console.log(id);
                const {providerAccessToken} = await authService.getSession();
                const userPersonalInfo = await authService.fetchGoogleUserData(providerAccessToken);
                const user = await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionUsersId,
                    [Query.equal("email", userData.email)]
                );
                console.log(user);
                if (!user || !user.documents.length) {
                    console.log("adding user to the table. with id=", id);
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionUsersId,
                        id,
                        {
                            name: userData?.name,
                            email: userData?.email,
                            profilePicture: userPersonalInfo?.picture,
                        }
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    getUserData = async (userId) => {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId
            );
        } catch (error) {
            console.log("error:/");
            return false;
        }
    };

    bookmarkBlog = async (userId, blogId, toSave) => {
        try {
            const userData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId
            );
            console.log(userId, blogId, toSave, userData);
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId,
                {
                    "savedBlogs": toSave
                        ? [...userData.savedBlogs.map((i) => i.$id), blogId]
                        : [...userData.savedBlogs.map((i) => i.$id).filter((id) => id != blogId)],
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    likeBlog = async (blogId, userId, toLike) => {
        try {
            const blogInfo = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                blogId
            );
            if (blogInfo) {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionBlogsId,
                    blogId,
                    {
                        "likedBy": toLike
                            ? [...(blogInfo?.likedBy || []), userId]
                            : [...(blogInfo?.likedBy?.filter((i) => i != userId) || [])],
                    }
                );
            } else throw "err";
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    followUser = async (requesterId, accepterId, toFollow) => {
        //todo
    };
}

const userDataService = new UserDataService();
export default userDataService;
