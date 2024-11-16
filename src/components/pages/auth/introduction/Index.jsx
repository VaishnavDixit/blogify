import React, {useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import authService from "../../../../appwrite/auth.js";
import userDataService from "../../../../appwrite/userData.js";
import "./style.scss";
import GoogleLogo from "../../../../assets/googleLogo.png";
const Index = () => {
	// debugger;
    const navigate = useNavigate();
    useEffect(() => {
		console.log(window.location.host, 'introduction UE')
        authService
		.getCurrentUser()
		.then((res) => {
				console.log('cur user fetched')
                // alert(JSON.stringify(res));
                localStorage.setItem("userData", JSON.stringify(res));
                localStorage.setItem("status", "true");
                if (res) {
                    userDataService.createUser().then(() => {
						console.log('.createUser() success')
                        navigate("/dashboard");
                    });
                }
            })
            .catch((res) => console.log(res));
    }, []);

    return (
        <Container>
            <div className="introductionPage row">
                <div className="d-flex flex-column justify-content-center col-sm-12 col-md-6">
                    <h4 className="font1-thin title text-md-start text-center">Blogify</h4>
                    <p className="font2-regular desc text-md-start text-center">
                        "Discover a world of insights and inspiration on our vibrant blogging hub."
                    </p>
                </div>
                <div className="d-flex flex-column btnColumn align-items-center justify-content-center col-sm-12 col-md-6">
                    {/* <Button className="m-2 p-2" onClick={() => navigate("sign-in")}>
                        Sign In
                    </Button> */}
                    <Button
                        variant="outline-primary rounded-pill"
                        className="m-2 p-2"
                        onClick={() => authService.createGoogleSession()}
                    >
                        <img src={GoogleLogo} className="me-2" />
                        Sign In With Google
                    </Button>
                    {/* <Button className="m-2 p-2" onClick={() => navigate("sign-up")}>
                        Sign Up
                    </Button> */}
                </div>
            </div>
        </Container>
    );
};

export default Index;
