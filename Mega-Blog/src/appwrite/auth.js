import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    account;

    constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
        conf.appwriteProjectId
    );
    this.account = new Account(this.Client);
    }

    async CreateAccount({ email, password, name }) {
    try {
        const UserAccount = await this.account.create(ID.unique, email, password, name);
        if(UserAccount){
            //call another method
            return this.login({email,password});
        }else{
            return UserAccount;
        }
    } catch (err) {
        throw err;
    }
    }

    async login({}){
        try{
            await this.account.createEmailSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
        return await this.account.get();
        }catch(error){
            throw error;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService
