import React, {useState} from "react";
import SubHeader from "../../utilities/subHeader/Index";
import ReactCrop from "react-image-crop";
import {Editor} from "@tinymce/tinymce-react";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import { Widgets } from "@mui/icons-material";
const Index = () => {
    const [data, setData] = useState("");
    const [crop, setCrop] = useState();
    const [image, setImage] = useState();
    const onchange = (d) => {
        console.log(d);
        setData(d);
    };
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const imgsize = file.size / 1024 <= 500;
        const imgType = file.name.match(/\.(jpg|jpeg|png)$/);
        if (imgsize && imgType) {
            const base64 = await convertBase64(file);
            setImage(base64);
            console.log(image);
        } else {
            if (!imgsize) throw "The image size should be less than 500KB";
            if (!imgType) throw "The File Type should be in jpg ,jpeg ,png";
        }
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    return (
        <>
            <SubHeader text={"Create a blog"} />
            <Container>
                <Tabs>
                    <Tab eventKey="edit" title="Edit" className="py-2 px-0">
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
                                        uploadImage(e);
                                    }}
                                />
                                <img src={image} style={{maxWidth:'100%',}}/>
                                {/* <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                                        <img src={image} />
                                    </ReactCrop>
									{JSON.stringify(crop)} */}
                            </Col>
                        </Row>
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
