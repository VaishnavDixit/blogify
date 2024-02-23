import React, {useState} from "react";
import SubHeader from "../../utilities/subHeader/Index";
import {Editor} from "@tinymce/tinymce-react";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
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
                <Tabs>
                    <Tab eventKey="edit" title="Edit" className="py-2 px-0">
                        <Tab.Content className="p-0">
                            <Row>
                                <Col sm={12} xs={12} >
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
                            </Row>
                        </Tab.Content>
                    </Tab>
                    <Tab eventKey="preview" title="Preview" className="p-2">
                        <Col sm={12} xs={12} dangerouslySetInnerHTML={{__html: data}}></Col>
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
};

export default Index;
