import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import authService from "../../../appwrite/auth";
import FeaturesPanel from "../../utilities/featuresPanel/Index";
import Posts from "../../utilities/posts/Index";
import SubHeader from "../../utilities/subHeader/Index";
import './style.scss'
import DiscoverOtherTopics from "../../utilities/discoverOtherTopics/Index";
const Index = () => {
    const [name, setName] = useState("");

    authService.getCurrentUser().then((value) => {
        setName(value?.name || "n/a");
    });

    return (
        <>
            <SubHeader text={`Welcome, ${name}`}/>
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-inline-block pe-4 leftCol">
                        <Container fluid>
                            <Row>
                                <Col sm={12} className="mb-4">
                                    <FeaturesPanel />
                                </Col>
                                <Col sm={12} className="mb-4">
                                    <DiscoverOtherTopics />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={8} sm={12} xs={12}>
                        <Posts query={[]} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
