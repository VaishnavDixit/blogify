import React from "react";
import "./style.scss";
import {Container, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

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
                    <Link to="sign-in">
                        <Button className="m-1">Sign In</Button>
                    </Link>
                    <Link to="sign-up">
                        <Button className="m-1">Sign Up</Button>
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Index;
