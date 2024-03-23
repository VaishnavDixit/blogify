import {Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import userDataService from "../../../appwrite/userData.js";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import {Col, Row} from "react-bootstrap";
import "./style.scss";
import Posts from "../../utilities/posts/Index.jsx";
import {Query} from "appwrite";
const Index = () => {
    const location = useLocation();
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
                if (
                    viewUserInfo.followers &&
                    viewUserInfo.followers.findIndex((i) => i == loggedInUserId) != -1
                ) {
                    console.log("u follow him");
                    setToFollow(true);
                } else setToFollow(false);
                console.log(viewUserInfo);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <>
            <SubHeader text={`Profile`} />
            <Container className="profile">
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        className="dataShow my-4 d-flex align-items-center justify-content-start"
                    >
                        <img src="https://picsum.photos/200/200" className="rounded-circle " />
                        <div className="text ps-3">
                            <h4>{userData?.name}</h4>
                            <p className="mb-0">1.2k followers, 12k+ likes</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={12}>
                        <Posts queries={[Query.equal("publisher", userData && userData?.$id)]} />
                    </Col>
                </Row>

                {/* <p>name: {userData?.name}</p>
                <p>email: {userData?.email}</p>
                <p>followers: {(userData?.followers && userData?.followers.length) || 0}</p>
                <p>following: {(userData?.following && userData?.following.length) || 0}</p>
                <p>Saved Blogs: {JSON.stringify(userData?.savedArticles)}</p>
                <button>follow</button> */}
            </Container>
        </>
    );
};

export default Index;
