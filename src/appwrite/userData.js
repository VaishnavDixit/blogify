import conf from "../conf/conf.js";
import {Client, Account, ID, Databases, Storage, Query} from "appwrite";
import authService from "./auth.js";
import {ToastContainer} from "react-bootstrap";

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
                            email: userData?.email,
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
            console.log("save: ", toSave);
            console.log([...userData.savedArticles.filter((i) => i != blogId)]);
            console.log([...userData.savedArticles, blogId]);
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId,
                {
                    "savedArticles": toSave
                        ? [...userData.savedArticles.map((i) => i.$id), blogId]
                        : [...userData.savedArticles.map((i) => i.$id).filter((i) => i != blogId)],
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    likeBlog = async (blogId, userId, toLike) => {
        //blogId is slug
        console.log(blogId, userId, toLike);
        try {
            const blogInfo = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                blogId
            );
            if (blogInfo) {
                console.log(blogInfo);
				console.log([...blogInfo?.likedBy.map((i) => i.$id) || [], userId])
				console.log([...blogInfo?.likedBy.map((i) => i.$id).filter((i) => i != userId)])
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionBlogsId,
                    blogId,
                    {
                        "likedBy": toLike
                            ? [...blogInfo?.likedBy.map((i) => i.$id) || [], userId]
                            : [...blogInfo?.likedBy.map((i) => i.$id).filter((i) => i != userId)],
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
