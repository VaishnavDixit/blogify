import conf from "../conf/conf";
import {Client, Account, ID, Databases, Storage, Query} from "appwrite";
import authService from "./auth";

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

    getUserData = async (id) => {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                id
            );
        } catch (error) {
            console.log("error:/");
            return false;
        }
    };

    bookmarkBlog = async (userId, blogId) => {
        // blog id is a slug
    };

    updatePost = async (slug, {title, featuredImage, content, status}) => {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                slug,
                {title, content, featuredImage, status}
            );
        } catch (error) {
            console.log(error);
        }
    };
}

const userDataService = new UserDataService();
export default userDataService;
