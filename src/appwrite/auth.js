/*
	file related to logging in/ out of appwrite. 
*/
import { Account, Client, ID } from "appwrite";
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
        console.log({email, password, name});
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log("successfullt signed up");
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
                "http://localhost:5173/",
                "http://localhost:5173/abd"
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
        try {
            console.log("logging out... from end point");
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
            return null;
        }
    };

    getSession = async () => {
        try {
            return await this.account.getSession("current");
        } catch (error) {
            console.log("error while gettting current user session");
            return null;
        }
    };

    fetchGoogleUserData = async (providerAccessToken) => {
        try {
            // Make a GET request to Google API to fetch user data
            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${providerAccessToken}`,
                },
            });
            console.log(response);
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
