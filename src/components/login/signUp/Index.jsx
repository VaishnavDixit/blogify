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
				<Col>
				</Col>
                <Col >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input type="email" defaultValue="test" {...register("example")} />
                        {errors.example && <span>invalid</span>}
                        {/* include validation with required or other standard HTML validation rules */}
                        <input {...register("exampleRequired", {required: true})} />
                        {errors.exampleRequired && <span>This field is required</span>}

                        <input type="submit" />
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default Index;
