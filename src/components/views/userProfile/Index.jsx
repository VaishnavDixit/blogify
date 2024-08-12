import { Bookmark, Favorite } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import service from "../../../appwrite/config.js";
import BlankPFP from "../../../assets/blankProfilePicture.png";
import { useGetCurrentUser, useGetUserData } from "../../../queries/auth.js";
import { dateFormat, handleClickTag } from "../../../utilityFunctions/utilities.js";
import Header from "../../utilities/header/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";

const Index = () => {
    const location = useLocation();
    const [toFollow, setToFollow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const navigate = useNavigate();
    const handleOnClickPost = (id) => navigate(`/view/${id}`);
    const {data: userData} = useGetUserData(location.state && location.state.userId);
    const {data: loggedInUser} = useGetCurrentUser();

    useEffect(() => {
        (async () => {
            try {
                const session = await authService.getSession();
                console.log("session: ", session);
                const providerAccessToken = session && session?.providerAccessToken;
                const personalInfo = await authService.fetchGoogleUserData(providerAccessToken);
                console.log(personalInfo);
                const loggedInUserInfoAuth = await authService.getCurrentUser();
                const loggedInUserId = loggedInUserInfoAuth.$id;

                // if (
                //     viewUserInfo.followers &&
                //     viewUserInfo.followers.findIndex((i) => i == loggedInUserId) != -1
                // ) {
                //     setToFollow(true);
                // } else setToFollow(false);

                service
                    .getPosts([
                        Query.equal("publisher", viewUserInfo && viewUserInfo?.$id),
                        Query.orderDesc("$createdAt"),
                    ])
                    .then((value) => {
                        console.log(value);
                        setPosts(value?.documents);
                    })
                    .catch((err) => console.log(err));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        if (posts) {
            let sum = 0;
            posts.map((post) => (sum += post.likedBy?.length ?? "-"));
            setTotalLikes(sum);
        }
    }, [posts]);

    const onFollowClick = () => {};

    return (
        <>
            <Header />
            <SubHeader text={"Profile"} backButton />
            {/* <ShowData data={loggedInUser} /> */}
            <Container className="profile mt-4">
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        md={5}
                        className="dataShow my-4 d-flex flex-column align-items-center"
                    >
                        <img
                            src={userData?.profilePicture || BlankPFP}
                            className="rounded-circle"
                        />
                        <div className="text ps-3 my-3">
                            <h4>{userData?.name}</h4>
                            <p className="mb-0 font1-thin">
                                {loggedInUser?.$createdAt
                                    ? `member since ${dateFormat(loggedInUser?.$createdAt)}`
                                    : null}
                            </p>
                        </div>
                        <h5 className="font1-bold text-center mb-3 mt-4">Tags Followed</h5>
                        <div className="d-flex flex-wrap justify-content-center">
                            {userData &&
                                userData?.tagsFollowed &&
                                userData?.tagsFollowed?.map((tag, index) => (
                                    <div
                                        key={index + 1}
                                        className=" tag px-3 pt-1 me-2 mb-2 rounded-pill font1-regular"
                                        onClick={() => handleClickTag(tag, navigate)}
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={7} className="">
                        {userData?.myArticles && userData?.myArticles?.length ? (
                            <h2 className=" blogsBy font1-thin mb-0 mt-3">
                                Blogs by {userData && userData?.name}
                            </h2>
                        ) : null}
                        <div className="blogs pt-4 pe-2">
                            {userData?.$id &&
                                userData?.myArticles &&
                                userData?.myArticles.map(
                                    (
                                        {
                                            title,
                                            featuredImage,
                                            description,
                                            publisher,
                                            $id,
                                            $createdAt,
                                            tags,
                                            savedBy,
                                            likedBy,
                                        },
                                        index
                                    ) => (
                                        <div
                                            key={index + 1}
                                            className="py-3 d-flex justify-content-between post"
                                        >
                                            <div className="textContent">
                                                <h3
                                                    className="font1-bolder line-wrap3 pointer"
                                                    onClick={() => handleOnClickPost($id)}
                                                >
                                                    {title}
                                                </h3>
                                                <div
                                                    onClick={() => handleOnClickPost($id)}
                                                    className="font2-regular line-wrap2 contentSection mb-0 me-3"
                                                >
                                                    {description}
                                                </div>
                                                <div className="info mt-2 pb-2 d-flex justify-content-between align-items-start">
                                                    <p className="mb-0 text-truncate">
                                                        <span className=" font1-regular">
                                                            {dateFormat($createdAt || "")}
                                                        </span>
                                                    </p>
                                                    <p className="mb-0">
                                                        <Favorite className="likeIcon mb-1 me-1" />
                                                        <span>
                                                            {(likedBy && likedBy?.length) ?? "-"}
                                                        </span>
                                                        <Bookmark className="saveIcon ms-2 mb-1 me-1" />
                                                        <span>
                                                            {(savedBy && savedBy?.length) ?? "-"}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="imgContent d-flex align-items-start justify-content-end">
                                                <img
                                                    onClick={() => handleOnClickPost($id)}
                                                    src={service.getImgPreview(featuredImage)}
                                                ></img>
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
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
