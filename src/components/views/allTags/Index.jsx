import {Search} from "@mui/icons-material";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {LoaderIcon} from "../../../assets/svgs.jsx";
import {useGetCurrentUser} from "../../../queries/auth.js";
import {useGetPosts} from "../../../queries/blogs.js";
import DiscoverOtherTopics from "../../utilities/discoverOtherTopics/Index.jsx";
import FeaturesPanel from "../../utilities/featuresPanel/Index.jsx";
import Skeleton from "react-loading-skeleton";

import "./style.scss";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import {BlogsListLoader} from "../../utilities/loadingScreens/Index.jsx";
import Post from "../../utilities/post/Index.jsx";
import Header from "../../utilities/header/Index.jsx";
const Index = () => {
    const {data: posts, isLoading} = useGetPosts();
    const {data: curUser, isLoading: isLoadingGetCurUser} = useGetCurrentUser();

    return (
        <>
            <Header />
            <SubHeader text={`All Tags`} backButton={false} />
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-inline-block pe-2 leftCol">
                        <Container fluid>
                            <Row>
                                <Col sm={12} className="mb-4">
                                    <div className="searchBar ps-2 py-2 d-flex align-itens-center justify-content-start border rounded-pill  py-1">
                                        <Search />
                                        <input type="text" className="me-3" />
                                    </div>
                                </Col>
                                <Col sm={12} className="mb-3">
                                    <FeaturesPanel />
                                </Col>
                                <Col sm={12} className="mb-4">
                                    <DiscoverOtherTopics />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={8} sm={12} xs={12} className="ps-4">
                        {isLoading ? (
                            <>
                                <BlogsListLoader />
                                <BlogsListLoader />
                                <BlogsListLoader />
                            </>
                        ) : (
                            <div className="postsStyle ps-md-0 ps-sm-0 container-fluid">
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

export default Index;
