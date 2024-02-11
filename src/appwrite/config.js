import {trackForMutations} from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware";
import conf from "../conf/conf";
import {Client, Account, ID, Databases, Storage, Query} from "appwrite";

//it's just database service
export class Service {
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

    createPost = async ({title, slug, featuredImage, content, status, userId}) => {
        //featured Image is an ID. actual image is stored in bucket aka storage
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status, userId}
            );
        } catch (error) {
            console.log(error);
        }
    };

    updatePost = async (slug, {title, featuredImage, content, status}) => {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status}
            );
        } catch (error) {
            console.log(error);
        }
    };

    deletePost = async (slug) => {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
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
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("error:/");
            return false;
        }
    };

	//has query in this
    getPosts = async (queries = [Query.equal("status", "active")]) => {
        // we only want active blogs
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {}
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
	//get file preview remaining 
}

const service = new Service();
export default service;
