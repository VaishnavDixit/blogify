import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userDataService from "../../../appwrite/userData";
import SubHeader from "../../utilities/subHeader/Index";
const Index = () => {
    const location = useLocation();
    console.log(location);
    const [userData, setUserData] = useState({});
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        (async () => {
            const info = await userDataService.getUserData(location.state && location.state.userId);
            console.log(info);
            if (info) setUserData(info);
        })();
    }, []);
    return (
        <>
            <SubHeader text={`Profile`} />
            {JSON.stringify(userData)}
            <Container className="profile">
                <p>name: {userData?.name}</p>
                <p>email: {userData?.email}</p>
                <p>followers: {(userData?.followers && userData?.followers.length) || 0}</p>
                <p>following: {(userData?.following && userData?.following.length) || 0}</p>
                <p>Saved Blogs: {JSON.stringify(userData?.savedBlogs)}</p>
            </Container>
        </>
    );
};

export default Index;
