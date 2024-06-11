import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    Client = new Client();
    databases;
    bucket;

    constructor()
    {
        this.Client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({title, slug, content , featured_image, status, user_id}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                    user_id
                }
            )
        }catch(error) {
            console.log("Appwrire service :: createPost :: error",error);
        }
    }

    async updatePost({slug, title, content , featuredImage, status}){
            try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            }catch(error) {
                console.log("Appwrire service :: createPost :: error",error);
            }
    }

    async deletePost({slug}){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error) {
            console.log("Appwrire service :: createPost :: error",error);
            return false
        }
    }

    async getPost(slug){
        try{
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error) {
            console.log("Appwrire service :: createPost :: error",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }catch(error) {
            console.log("Appwrire service :: createPost :: error",error);
            return false
        }
    }
    // File Upload Service
    async uploadFile(file){
            try{
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                )
            }catch(error) {
            console.log("Appwrire service :: createPost :: error",error);
            return false
        }
    }
    async deleteFile(fileId){
            try{
                await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                )
                return true
            }catch(error) {
            console.log("Appwrire service :: createPost :: error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service