import {Client, Databases, ID, Query, Storage} from "appwrite";
import conf from "../conf/conf.js";
//it's just database service
export class Service {
    client;
    databases;
    bucket; // storage
    constructor() {
        this.client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    createPost = async (slug, {title, content, featuredImage, tags, publisher, description}) => {
        //featured Image is an ID. actual image is stored in bucket aka storage
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                slug, //slug is used as the the doc ID here.
                {title, content, featuredImage, tags, publisher, description}
            );
        } catch (error) {
            console.log(error);
        }
    };

    updatePost = async (slug, {title, content, featuredImage, tags, publisher, description}) => {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                slug,
                {title, content, featuredImage, tags, publisher, description}
            );
        } catch (error) {
            console.log(error);
        }
    };

    deletePost = async (slug) => {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                slug
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    //slug will be the document id
    getPost = async (slug) => {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                slug
            );
        } catch (error) {
            console.log("error:/");
            return false;
        }
    };

    //has query in this
    getPosts = async (queries = []) => {
        // we only want active blogs
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                [...queries, Query.orderDesc("$createdAt")]
            );
        } catch (error) {
            console.log(error);
        }
    };

    //upload files aka images in storage aka bucket
    uploadFile = async (file) => {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("error in uploading file ;/");
            return false;
        }
    };

    //delete   files aka images in storage aka bucket
    deleteFile = async (fileId) => {
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("error in deleting file ;/");
            return false;
        }
    };

    //get file preview remaining (not an async function)
    getImgPreview = (fileId) => {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    };

    getTags = async (count = 1000000000) => {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionTagsId,
                [Query.limit(count), Query.orderAsc("name")]
            );
        } catch (error) {
            console.log(error);
        }
    };

    getTag = async (id) => {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionTagsId,
                id
            );
        } catch (error) {
            console.log(error);
        }
    };

    followTag = async (userId, tagId, toFollow) => {
        try {
            const userInfo = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionUsersId,
                userId
            );
            if (userInfo) {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionUsersId,
                    userId,
                    {
                        "followedTags": toFollow
                            ? [...(userInfo?.followedTags.map((i) => i.$id) || []), tagId]
                            : [
                                  ...userInfo?.followedTags
                                      .map((i) => i.$id)
                                      .filter((id) => id != tagId),
                              ],
                    }
                );
            } else throw "err";
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}

const service = new Service();
export default service;
