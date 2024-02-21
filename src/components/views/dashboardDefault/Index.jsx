import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import FeaturesPanel from "../../utilities/featuresPanel/Index";
import SubHeader from "../../utilities/subHeader/Index";

const Index = () => {
    return (
        <>
            <SubHeader text={"Welcome, Vaishnav"} />
            <Container>
                <Row>
                    <Col md={4} className="d-none d-md-inline-block">
                        <FeaturesPanel />
                    </Col>
                    <Col md={4} sm={6}>
                        <FeaturesPanel />
                    </Col>
                    <Col md={4} sm={6}>
                        <FeaturesPanel />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
