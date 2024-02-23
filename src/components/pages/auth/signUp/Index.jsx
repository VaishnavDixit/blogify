import React from "react";
import "./style.scss";

import {Container, Row, Col, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import authService from "../../../../appwrite/auth";
import {login} from "../../../../store/authSlice";
import {useNavigate} from "react-router-dom";
const Index = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signUp = async (data) => {
        try {
            const session = await authService.createAccount(data);
            if (session) {
                localStorage.setItem("status", true);
                dispatch(login({email: data.email, password: data.password}));
                //login into redux store
                navigate("/dashboard");
                console.log("Successfully signed up ;)");
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="signUpPage d-flex align-items-center container">
            <Row>
                <Col sm={12}>
                    <p className="josefin-sans-bold desc">
                        Sign up to write and view awesome blogs.
                    </p>
                </Col>
                <Col sm={12}>
                    <form onSubmit={handleSubmit(signUp)} className="container">
                        <Row>
                            <Col sm={12} className="mb-2">
                                {/* register your input into the hook by invoking the "register" function */}
                                <input
                                    className="form-control"
                                    placeholder="Name"
                                    {...register("name")}
                                />
                                {errors.name && <span>invalid</span>}
                            </Col>
                            <Col sm={12} className="mb-2">
                                {/* register your input into the hook by invoking the "register" function */}
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                {errors.email && <span>invalid</span>}
                            </Col>
                            <Col sm={12} className="mb-2">
                                <input
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    {...register("password", {required: true})}
                                />
                                {errors.password && <span>This field is required</span>}
                            </Col>
                            {/* include validation with required or other standard HTML validation rules */}
                            <Col sm={12} className="mb-2">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default Index;
