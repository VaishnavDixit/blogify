import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";

const Index = () => {
    return (
        <div className="loginPage d-flex flex-column flex-md-row justify-content-between">
            <div className="d-flex flex-column justify-content-center">
                <h4 className="josefin-sans-thin title text-md-start text-center">Blogify</h4>
                <p className="cardo-regular desc text-md-start text-center">
                    "Discover a world of insights and inspiration on our vibrant blogging hub."
                </p>
            </div>
            <div className="d-flex flex-row flex-md-column justify-content-center">
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
