import {Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import userDataService from "../../../appwrite/userData.js";
import SubHeader from "../../utilities/subHeader/Index.jsx";
const Index = () => {
    const location = useLocation();
    console.log(location);
    const [userData, setUserData] = useState({});
    const [loggedInUser, setLoggedInUser] = useState({});
    const [toFollow, setToFollow] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const viewUserInfo = await userDataService.getUserData(
                    location.state && location.state.userId
                );
                if (viewUserInfo) setUserData(viewUserInfo);
                const loggedInUserInfoAuth = await authService.getCurrentUser();
                const loggedInUserId = loggedInUserInfoAuth.$id;
                // const loggedInUserInfo = await userDataService.getUserData(loggedInUserId);
                if (viewUserInfo.followers.findIndex((i) => i == loggedInUserId) != -1) {
                    console.log("u follow him");
                    setToFollow(true);
                } else setToFollow(false);
                console.log(viewUserInfo);
            } catch (error) {
                console.log(err);
            }
        })();
    }, []);
    const handleClickFollow = async () => {};
    return (
        <>
            <SubHeader text={`Profile`} />
            {JSON.stringify(userData)}
            <Container className="profile">
                <p>name: {userData?.name}</p>
                <p>email: {userData?.email}</p>
                <p>followers: {(userData?.followers && userData?.followers.length) || 0}</p>
                <p>following: {(userData?.following && userData?.following.length) || 0}</p>
                <p>Saved Blogs: {JSON.stringify(userData?.savedArticles)}</p>
                <button>follow</button>
            </Container>
        </>
    );
};

export default Index;
