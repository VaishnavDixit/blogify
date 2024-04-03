import {Bookmark, Favorite} from "@mui/icons-material";
import {Container} from "@mui/material";
import {Query} from "appwrite";
import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import service from "../../../appwrite/config.js";
import userDataService from "../../../appwrite/userData.js";
import {dateFormat} from "../../../utilityFunctions/utilities.js";
import "./style.scss";

const Index = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [loggedInUser, setLoggedInUser] = useState({});
    const [tags, setTags] = useState([]);
    const [toFollow, setToFollow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    // console.log(queries);
    const navigate = useNavigate();
    const handleOnClickPost = (id) => navigate(`/dashboard/view/${id}`);
    useEffect(() => {
        (async () => {
            try {
                const viewUserInfo = await userDataService.getUserData(
                    location.state && location.state.userId
                );
                if (viewUserInfo) setUserData(viewUserInfo);
                const loggedInUserInfoAuth = await authService.getCurrentUser();
                const loggedInUserId = loggedInUserInfoAuth.$id;
                if (
                    viewUserInfo.followers &&
                    viewUserInfo.followers.findIndex((i) => i == loggedInUserId) != -1
                ) {
                    setToFollow(true);
                } else setToFollow(false);
                const res = await service.getTags();
                setTags(res.documents);
                service
                    .getPosts([Query.equal("publisher", viewUserInfo && viewUserInfo?.$id)])
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

    return (
        <Container className="profile mt-4">
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    md={3}
                    className="dataShow my-4 d-flex flex-column align-items-center"
                >
                    <img src="https://picsum.photos/200/200" className="rounded-circle " />
                    <div className="text ps-3 my-3">
                        <h4>{userData?.name}</h4>
                        <p className="mb-0 josefin-sans-thin">
                            1.2k followers, {totalLikes} like{totalLikes == 1 ? "" : "s"}
                        </p>
                    </div>
                    <h5 className="josefin-sans-bold text-center mb-3 mt-4">Interests</h5>
                    <div className="d-flex flex-wrap justify-content-center">
                        {tags?.map((tag, index) => (
                            <div
                                key={index + 1}
                                className=" tag px-3 pt-1 me-2 mb-2 rounded-pill josefin-sans"
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </Col>
                <Col xs={12} sm={12} md={9} className="">
                    {posts && posts.length ? (
                        <h2 className=" blogsBy josefin-sans-thin mb-0">Blogs by {userData && userData?.name}</h2>
                    ) : null}
                    <div className="blogs pt-5 pe-2">
                        {userData?.$id &&
                            posts &&
                            posts.map(
                                ({
                                    title,
                                    content,
                                    featuredImage,
                                    publisher,
                                    $id,
                                    $createdAt,
                                    tags,
                                    savedBy,
                                    likedBy,
                                }) => (
                                    <div className="py-3 d-flex justify-content-between post">
                                        <div className="textContent">
                                            <h3
                                                className="josefin-sans-bolder line-wrap3 pointer"
                                                onClick={() => handleOnClickPost($id)}
                                            >
                                                {title}
                                            </h3>
                                            <div
                                                onClick={() => handleOnClickPost($id)}
                                                className="cardo-regular line-wrap2 contentSection mb-0 me-3"
                                                dangerouslySetInnerHTML={{__html: content}}
                                            ></div>
                                            <div className="info mt-2 pb-2 d-flex justify-content-between align-items-start">
                                                <p className="mb-0 text-truncate">
                                                    <span className=" josefin-sans">
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
    );
};

export default Index;
