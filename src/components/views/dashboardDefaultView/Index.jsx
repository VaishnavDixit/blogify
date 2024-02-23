import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import FeaturesPanel from "../../utilities/featuresPanel/Index";
import SubHeader from "../../utilities/subHeader/Index";
import service from "../../../appwrite/config";
import Posts from "../../utilities/posts/Index";
import authService from "../../../appwrite/auth";

const Index = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts([]).then((value) => {
            setPosts(value.documents);
        });
    }, []);
    const [name, setName] = useState("");
    authService.getCurrentUser().then((value) => {
        setName(value.name);
    });
    return (
        <>
            <SubHeader text={`Welcome, ${name}`} />
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-inline-block">
                        <FeaturesPanel />
                    </Col>
                    <Col md={8} sm={6}>
                        <Posts />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
