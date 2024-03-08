import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../../appwrite/auth.js";
import {login as reduxLogin} from "../../../../store/authSlice.js";
import "./style.scss";
const Index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();
    const login = async (data) => {
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                localStorage.setItem("status", true);
                localStorage.setItem("userData", JSON.stringify(userData));
                if (userData) {
                    dispatch(reduxLogin({userData}));
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container>
            <div className="signUpPage d-flex flex-nowrap flex-column justify-content-center row">
                <Col sm={12}>
                    <p className="josefin-sans-bold desc text-center">
                        Sign in to Blogify to access your account.
                    </p>
                </Col>
                <Col sm={12} className="px-md-5 px-sm-2">
                    <form onSubmit={handleSubmit(login)} className="container">
                        <Row>
                            <Col sm={12} className="mb-3">
                                {/* register your input into the hook by invoking the "register" function */}
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                {errors.email && <span>invalid</span>}
                            </Col>
                            <Col sm={12} className="mb-3">
                                <input
                                    className="form-control form-color1"
                                    placeholder="Password"
                                    type="password"
                                    {...register("password", {required: true})}
                                />
                                {errors.password && <span>This field is required</span>}
                            </Col>
                            {/* include validation with required or other standard HTML validation rules */}
                            <Col sm={12} className="d-flex justify-content-center">
                                <Button type="submit" className="px-3 py-2">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </div>
        </Container>
    );
};

export default Index;
