import React, {useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "./style.scss";
const Index = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("status"));
        // if (localStorage.getItem("status") === "true") navigate("/dashboard");
    }, []);

    return (
        <Container>
            <div className="introductionPage row">
                <div className="d-flex flex-column justify-content-center col-sm-12 col-md-6">
                    <h4 className="josefin-sans-thin title text-md-start text-center">Blogify</h4>
                    <p className="cardo-regular desc text-md-start text-center">
                        "Discover a world of insights and inspiration on our vibrant blogging hub."
                    </p>
                </div>
                <div className="d-flex flex-column btnColumn align-items-center justify-content-center col-sm-12 col-md-6">
                    <Button className="m-2 p-2" onClick={() => navigate("sign-in")}>
                        Sign In
                    </Button>
                    <Button className="m-2 p-2" onClick={() => navigate("sign-up")}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Index;
