import conf from "../conf/conf.js";
import {Client, Account, ID, Databases, Storage, Query} from "appwrite";
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
                console.log(userData);
                const id = userData.$id;
                const user = await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionUsersId,
                    [Query.equal("email", userData.email)]
                );
                if (!user || !user.length) {
                    console.log("adding user to the table. with id=", id);
                    console.log(userData);
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionUsersId,
                        id,
                        {
                            name: userData?.name,
                            followers: [],
                            following: [],
                            email: userData?.email,
                            savedBlogs: [],
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
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId,
                {
                    "savedBlogs": toSave
                        ? [...userData.savedBlogs, blogId]
                        : [...userData.savedBlogs.filter((i) => i != blogId)],
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    likeBlog = async (blogId, userId, toLike) => {
        //blogId is slug
        try {
            const userData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId
            );
            const blogInfo = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                blogId
            );
            if (blogInfo) {
                const user = await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionUsersId,
                    userId,
                    {
                        "likedPosts": toLike
                            ? [...userData?.likedPosts, blogId]
                            : userData?.likedPosts.filter((i) => i != blogId),
                    }
                );
                if (user) {
                    return await this.databases.updateDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionBlogsId,
                        blogId,
                        {
                            "likes": blogInfo.likes + (toLike ? 1 : -1),
                        }
                    );
                } else throw "err2";
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
