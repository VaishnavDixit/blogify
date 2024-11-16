/*
	file related to logging in/ out of appwrite. 
*/
import {Account, Client, ID} from "appwrite";
import axios from "axios";
import conf from "../conf/conf.js";

export class AuthService {
    client;
    account;
    session;
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
                console.log("successfully signed up");
                return await this.login({email, password});
            } else return userAccount;
        } catch (error) {
            console.log(error);
        }
    };
    createGoogleSession = async () => {
        try {
            this.account.createOAuth2Session(
                "google",
				`http://${window.location.host}/`,
				`http://${window.location.host}/error`,
            );
        } catch (err) {
            console.log(err);
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
        return await this.account.deleteSessions();
    };

    getCurrentUser = async () => {
        return await this.account.get();
    };

    getSession = async () => {
        return await this.account.getSession("current");
        
    };

    fetchGoogleUserData = async (providerAccessToken) => {
        try {
            // Make a GET request to Google API to fetch user data
			console.log('inside fetchGoogleUserData')
            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${providerAccessToken}`,
                },
            });
            console.log('response:', response);
            // Handle the response and extract user data
            const userData = response.data;
            return userData;
        } catch (error) {
            console.error("Error fetching Google user data:", error.response.data);
            throw new Error("Failed to fetch Google user data");
        }
    };
}
const authService = new AuthService();
export default authService;
