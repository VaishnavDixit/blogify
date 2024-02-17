/*
	file related to logging in/ out of appwrite. 
*/
import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";

export class AuthService {
    client;
    account;
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    createAccount = async ({email, password, name}) => {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //will log in now
            } else return userAccount;
        } catch (error) {
            console.log(error);
        }
    };

    login = async ({email, password}) => {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    };

    logout = async () => {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("err logging out");
        }
    };

    getCurrentUser = async () => {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("error while gettting current user :/");
        }
        return null;
    };
}
const authService = new AuthService();
export default authService;
