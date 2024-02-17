import React from "react";
import "./style.scss";

import {Container, Row, Col, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
const Index = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div className="signUpPage container">
            <Row>
                <Col sm={12}>
                    <p className="josefin-sans-bold desc">
                        Sign up to write and view awesome blogs.
                    </p>
                </Col>
                <Col sm={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className="container">
                        <Row>
                            <Col sm={12} className="mb-2">
                                {/* register your input into the hook by invoking the "register" function */}
                                <input placeholder="Name" {...register("name")} />
                                {errors.example && <span>invalid</span>}
                            </Col>
                            <Col sm={12} className="mb-2">
                                {/* register your input into the hook by invoking the "register" function */}
                                <input placeholder="Email" {...register("email")} />
                                {errors.example && <span>invalid</span>}
                            </Col>
                            <Col sm={12} className="mb-2">
                                <input placeholder="Password" type="password" {...register("exampleRequired", {required: true})} />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </Col>
                            {/* include validation with required or other standard HTML validation rules */}
                            <Col sm={12} className="mb-2">
                                <input type="submit" />
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default Index;
