import React from "react";
import "./style.scss";

import {Container, Row, Col, Button} from "react-bootstrap";
const Index = () => {
    return (
        <div className="loginPage d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center">
                <h4 className="josefin-sans-thin title">Blogify</h4>
                <p className="cardo-regular desc">
                    "Discover a world of insights and inspiration on our vibrant blogging hub."
                </p>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <span>
                    <Button className="m-1">
                        Sign In
                    </Button>
                    <Button className="m-1">Sign Up</Button>
                </span>
            </div>
        </div>
    );
};

export default Index;
