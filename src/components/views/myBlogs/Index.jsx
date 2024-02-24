import {Query} from "appwrite";
import React from "react";
import {Container} from "react-bootstrap";
import authService from "../../../appwrite/auth";
import Posts from "../../utilities/posts/Index";
import SubHeader from "../../utilities/subHeader/Index";
const Index = () => {
    console.log(JSON.parse(localStorage.userData).$id)
    return (
        <>
            <SubHeader text={`My Blogs`} />
            <Container>
                <Posts queries={[Query.equal("userId", JSON.parse(localStorage.userData).$id)]} />
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
