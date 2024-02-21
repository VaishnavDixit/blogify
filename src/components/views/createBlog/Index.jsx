import React, {useState} from "react";
import SubHeader from "../../utilities/subHeader/Index";
import {Editor} from "@tinymce/tinymce-react";
import {Col, Container, Row} from "react-bootstrap";
const Index = () => {
    const [data, setData] = useState("");
    const onchange = (d) => {
        console.log(d);
        setData(d);
    };
    return (
        <>
            <SubHeader text={"Create a blog"} />
            <Container>
                <Row>
                    <Col sm={12} md={6}>
                        <Editor
                            apiKey="jntiw31132ao4jsbperypsg60i5yeaoqd7uimsnooxz7pbtd"
                            initialValue="default Value"
                            init={{
                                branding: false,
                                height: 500,
                                plugins: "lists",
                                nonbreaking_force_tab: true,
                                toolbar: "numlist bullist",
                            }}
                            onEditorChange={onchange}
                        />
                    </Col>
                    <Col sm={12} md={6} dangerouslySetInnerHTML={{__html: data}}></Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
