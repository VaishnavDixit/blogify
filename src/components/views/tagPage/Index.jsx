import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import {useLocation, useParams} from "react-router-dom";
import {useGetCurrentUser} from "../../../queries/auth.js";
import {useGetPosts} from "../../../queries/blogs.js";
import {useGetTag} from "../../../queries/tags.js";
import DiscoverOtherTopics from "../../utilities/discoverOtherTopics/Index.jsx";
import FeaturesPanel from "../../utilities/featuresPanel/Index.jsx";
import {BlogsListLoader} from "../../utilities/loadingScreens/Index.jsx";
import Post from "../../utilities/post/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";

import "./style.scss";

const Index = () => {
    console.log("page reload");
    const location = useLocation();

    const {
        data: tagInfo,
        isloading: isloadingTagInfo,
        refetch,
        isFetching,
    } = useGetTag(location && location.state.id);

    useEffect(() => {
        console.log("refetching...");
        refetch();
    }, [location?.state?.id]);

    return (
        <>
            {/* <SubHeader text={``} backButton={false} /> */}
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-inline-block pe-0 mt-5 leftCol">
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
                        {isloadingTagInfo || isFetching ? (
                            <TagPageLoader />
                        ) : (
                            <div className="mainContent ps-md-0 ps-sm-0 container-fluid mt-3">
                                <Row
                                    className="tagInfoSection px-4 pb-3 mb-4"
                                    style={{
                                        backgroundImage: "url('https://picsum.photos/650/200')",
                                        height: "200px",
                                    }}
                                >
                                    <Col
                                        sm={12}
                                        xs={12}
                                        className="contentCol d-flex flex-column justify-content-end"
                                    >
                                        <h3 className="josefin-sans-bold tagName mb-1 text-center text-md-start">
                                            {tagInfo && tagInfo?.name}
                                        </h3>
                                        <div className="d-flex flex-column flex-md-row align-items-center">
                                            <p className="josefin-sans-thin tagInfo mb-0">
                                                12k followers, {tagInfo &&
                                        tagInfo.articles?.length} blogs
                                            </p>
                                            <Button
                                                className="rounded-pill px-4 followBtn ms-3"
                                                variant="outline-grey"
                                            >
                                                Follow
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="postsContent">
                                    {tagInfo &&
                                        tagInfo.articles.map((post, index) => (
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
