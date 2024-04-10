import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useGetCurrentUser} from "../../../queries/auth.js";
import {useGetPosts} from "../../../queries/blogs.js";
import DiscoverOtherTopics from "../../utilities/discoverOtherTopics/Index.jsx";
import FeaturesPanel from "../../utilities/featuresPanel/Index.jsx";
import {useParams} from "react-router-dom";
import {BlogsListLoader} from "../../utilities/loadingScreens/Index.jsx";
import Post from "../../utilities/post/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";
import {Add, PlusOne} from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";

const Index = () => {
    const {data: posts, isLoading} = useGetPosts();
    const {data: curUser, isLoading: isLoadingGetCurUser} = useGetCurrentUser();
    const params = useParams();
    return (
        <>
            <SubHeader text={``} backButton={false} />
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-inline-block pe-0 leftCol">
                        <Container fluid>
                            <Row>
                                <Col sm={12} className="mb-4">
                                    <DiscoverOtherTopics />
                                </Col>
                                <Col sm={12} className="mb-3">
                                    <FeaturesPanel />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={8} sm={12} xs={12}>
                        {isLoading ? (
                            <TagPageLoader />
                        ) : (
                            <div className="mainContent ps-md-0 ps-sm-0 container-fluid">
                                <Row className="tagInfoSection pb-5">
                                    <Col sm={12} xs={12}>
                                        <h1 className="josefin-sans-bolder tagName">Music</h1>
                                        <p className="josefin-sans-thin tagInfo">
                                            12k followers, 103 blogs
                                        </p>
                                        <Button
                                            variant="grey"
                                            className="rounded-pill px-4 followBtn"
                                        >
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    {posts &&
                                        posts?.documents &&
                                        posts?.documents?.map((post, index) => (
                                            <Post key={index + 1} post={post} />
                                        ))}
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const TagPageLoader = () => (
    <>
        <Skeleton
            style={{
                width: "40%",
                height: "40px",
                borderRadius: "20px",
                marginBottom: "10px",
            }}
        />
        <Skeleton
            style={{
                width: "60%",
                height: "15px",
                marginBottom: "10px",
                borderRadius: "7px",
            }}
        />
        <Skeleton
            style={{
                width: "20%",
                height: "40px",
                borderRadius: "20px",
                marginBottom: "60px",
            }}
        />
        <BlogsListLoader />
        <BlogsListLoader />
    </>
);

export default Index;
