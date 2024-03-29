/*
	file related to logging in/ out of appwrite. 
*/
import conf from "../conf/conf.js";
import {Client, Account, ID} from "appwrite";
import userDataService from "./userData.js";
import {current} from "@reduxjs/toolkit";

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
    //65c53f61a610a794ea50
    createAccount = async ({email, password, name}) => {
        console.log({email, password, name});
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //will log in now
                console.log("successfullt signed up");
                return await this.login({email, password});
            } else return userAccount;
        } catch (error) {
            console.log(error);
        }
    };
    createGoogleSession = async () => {
        try {
            this.account.createOAuth2Session("google", "http://localhost:5173/");
            // const session = await this.account.getSession("current");
            // if(session){
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

    // getUser = async (userId) =>{

    // }
}
const authService = new AuthService();
export default authService;
