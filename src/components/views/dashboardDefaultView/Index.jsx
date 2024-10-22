import {Search} from "@mui/icons-material";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {LoaderIcon} from "../../../assets/svgs.jsx";
import {useGetCurrentUser} from "../../../queries/auth.js";
import {useGetPosts} from "../../../queries/blogs.js";
import DiscoverOtherTopics from "../../utilities/discoverOtherTopics/Index.jsx";
import FeaturesPanel from "../../utilities/featuresPanel/Index.jsx";
import Skeleton from "react-loading-skeleton";
import {ID} from "appwrite";
import "./style.scss";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import {BlogsListLoader} from "../../utilities/loadingScreens/Index.jsx";
import Post from "../../utilities/post/Index.jsx";
const Index = () => {
    const {data: posts, isLoading} = useGetPosts();
    const {data: curUser, isLoading: isLoadingGetCurUser} = useGetCurrentUser();

    return (
        <>
            <SubHeader
                text={`Welcome, ${isLoadingGetCurUser ? "-" : curUser?.name}`}
                backButton={false}
            />
            <Container>
                <Row className="gx-5">
                    <Col md={4} className="d-none d-md-inline-block pe-4 leftCol">
                        <Container fluid>
                            <Row>
                                <Col sm={12} className="mb-3">
                                    <FeaturesPanel key={ID.unique()} />
                                </Col>
                                <Col sm={12} className="mb-4">
                                    <DiscoverOtherTopics key={ID.unique()} />
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
								{/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
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
