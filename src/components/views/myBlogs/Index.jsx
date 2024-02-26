import {Query} from "appwrite";
import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import authService from "../../../appwrite/auth";
import Posts from "../../utilities/posts/Index";
import SubHeader from "../../utilities/subHeader/Index";
import service from "../../../appwrite/config";
const Index = () => {
    // console.log(JSON.parse(localStorage.userData).$id)
    const [userId, setUserId] = useState("");
    useEffect(() => {
        authService.getCurrentUser().then((res) => setUserId(res.$id));
    }, []);
    const handleDeleteBlog = async (slug) => {
        service.deletePost(slug).then((res) => {
            console.log(res);
            console.log("deletion done");
            navigate("/dashboard/my-blogs");
        });
    };
    return (
        <>
            <SubHeader text={`My Blogs`} />
            <Container>
                {userId && (
                    <Posts
                        queries={[Query.equal("userId", userId)]}
                    />
                )}
                {/* <Row>
                    <Col md={4} className="d-none d-md-inline-block">
                        <Container fluid>
                            <Row>
                                <Col sm={12} className="mb-4">
                                    {" "}
                                    <FeaturesPanel />
                                </Col>
                                <Col sm={12} className="mb-4">
                                    {" "}
                                    <FeaturesPanel />
                                </Col>
                                <Col sm={12} className="mb-4">
                                    {" "}
                                    <FeaturesPanel />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={8} sm={12} xs={12}>
                       
                    </Col>
                </Row> */}
            </Container>
        </>
    );
};

export default Index;
