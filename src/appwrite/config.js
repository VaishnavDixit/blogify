import conf from "../conf/conf.js";
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

    createPost = async ({title, slug, featuredImage, content, status, publisher, tags}) => {
        //featured Image is an ID. actual image is stored in bucket aka storage
        console.log({title, slug, featuredImage, content, status, publisher, tags});
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                slug, //slug is used as the the doc ID here.
                {title, content, featuredImage, tags, publisher}
            );
        } catch (error) {
            console.log(error);
        }
    };


	/*
	
	name
	String
	-
	followers
	String []
	-
	following
	String []
	-
	email
	String
	-
	articles
	Relationship with articles
	-
	savedArticles
	Relationship with savedArticles
	-
	likedArticles
	Relationship with likedArticles
-title
String
-
content
String
-
featuredImage
String
-
tags
Relationship with tags
-
publisher
Relationship with publisher
-
savedBy
Relationship with savedBy

	*/
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
    getPosts = async (queries = [Query.equal("status", "active")]) => {
        // we only want active blogs
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBlogsId,
                queries
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

    getTags = async () => {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionTagsId,
                []
            );
        } catch (error) {
            console.log(error);
        }
    };
}

const service = new Service();
export default service;
