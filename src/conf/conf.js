//better way to use env variables prod grade approach
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionBlogsId: String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOGS_ID),
    appwriteCollectionUsersId: String(import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
export default conf;
