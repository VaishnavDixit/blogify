import React, {useState} from "react";
import SubHeader from "../../utilities/subHeader/Index";
import ReactCrop from "react-image-crop";
import {Editor} from "@tinymce/tinymce-react";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
const Index = () => {
    const [data, setData] = useState("");
    const [crop, setCrop] = useState();
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
                                <Col sm={12} md={6} xs={12}>
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
                                <Col sm={12} md={6} xs={12}>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={(e) => {
                                            console.log(e.target.files[0]);
                                            setCrop(e.target.files[0]);
                                        }}
                                    />
                                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                                        <img src={crop} />{" "}
                                    </ReactCrop>
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
