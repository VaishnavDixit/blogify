import React, {useState} from "react";
import SubHeader from "../../utilities/subHeader/Index";
import ReactCrop from "react-image-crop";
import {Editor} from "@tinymce/tinymce-react";
import {Button, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import {AddAPhoto, Cancel, CancelOutlined, Widgets} from "@mui/icons-material";
import "./style.scss";
import {useForm} from "react-hook-form";
import service from "../../../appwrite/config";
import {json} from "react-router-dom";
import {useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
const Index = () => {
    const [content, setContent] = useState("");
    const [finalImage, setFinalImage] = useState("");
    // const userData = useSelector((state) => state.userData);
    const onchange = (d) => {
        setContent(d);
    };
    const navigate = useNavigate();
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const imgsize = file.size / 1024 <= 500;
        const imgType = file.name.match(/\.(jpg|jpeg|png)$/);
        if (imgsize && imgType) {
            const base64 = await convertBase64(file);
            setFinalImage(base64);
        } else {
            if (!imgsize) alert("The image size should be less than 500KB");
            if (!imgType) alert("The File Type should be in jpg ,jpeg ,png");
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
    const handleOnClickCancelImage = (e) => {
        e.preventDefault();
        setFinalImage("");
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();
	
    const submitBlog = async ({title, featuredImage}) => {
        if (!title || !featuredImage || content == "") {
            alert("invalid submission");
        }
        const slug = title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
            .substring(0, 16);

        const userId = JSON.parse(localStorage.getItem("userData")).$id;
        const uploadedFile = await service.uploadFile(featuredImage[0]);
        if (uploadedFile) {
            const id = uploadedFile.$id;
            service
                .createPost({
                    title,
                    slug,
                    featuredImage: id,
                    content,
                    "status": "active",
                    userId: userId,
                })
                .then((res) => {
                    reset({title: ""});
                    setFinalImage("");
                    setContent("");
                    enqueueSnackbar("Successfully Uploaded.", {
                        variant: "success",
                        anchorOrigin: {
                            horizontal: "right",
                            vertical: "top",
                        },
                        style: {
                            background: "pink",
                        },
                    });
                    navigate(`/dashboard/view/${slug}`);
                });
        } else {
            console.log("not uploaded :/");
        }
    };
    return (
        <>
            <SubHeader text={"Create a blog"} />
            <Container className="createBlogPage">
                {/* <Tabs>
                    <Tab eventKey="edit" title="Edit" className="py-4 px-0"> */}
                <form onSubmit={handleSubmit(submitBlog)}>
                    <Row>
                        <Col sm={12} xs={12} className="mb-3">
                            <textarea
                                className="form-control titleInput"
                                type="text"
                                placeholder="Enter Title"
                                defaultValue="Untitled"
                                rows={1}
                                {...register("title", {required: true})}
                            />
                            {errors && errors.title}
                        </Col>
                        <Col sm={12} md={4} xs={12} className="mb-3">
                            <label className="imageInputLabel d-flex align-items-center justify-content-center">
                                {finalImage ? (
                                    <>
                                        <img src={finalImage} />
                                        <CancelOutlined
                                            className="cancelIcon"
                                            onClick={handleOnClickCancelImage}
                                        />
                                    </>
                                ) : (
                                    <p className="labelText josefin-sans-bold text-center mb-0">
                                        <AddAPhoto className="mb-2 me-1 addPhotoIcon" />
                                        Upload Photo
                                    </p>
                                )}
                                <input
                                    className="form-control d-none"
                                    type="file"
                                    {...register("featuredImage", {
                                        onChange: (e) => {
                                            uploadImage(e);
                                        },
                                    })}
                                />
                                {errors && errors.featuredImage}
                            </label>
                        </Col>
                        <Col sm={12} md={8} xs={12} className="mb-3">
                            <Editor
                                apiKey="jntiw31132ao4jsbperypsg60i5yeaoqd7uimsnooxz7pbtd"
                                initialValue=""
                                init={{
                                    branding: false,
                                    height: 500,
                                    plugins: "lists",
                                    nonbreaking_force_tab: true,
                                    // toolbar: "numlist bullist",
                                }}
                                value={content}
                                onEditorChange={onchange}
                            />
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button variant="webdarkblue" type="submit">
                                Submit Blog
                            </Button>
                            <Button className="btn btn-outlined ms-2" variant="webpinkred">
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </form>

                {/* </Tab>
                    <Tab eventKey="preview" title="Preview" className="p-2">
                        <Col sm={12} xs={12} dangerouslySetInnerHTML={{__html: data}}></Col>
                    </Tab>
                </Tabs> */}
            </Container>
        </>
    );
};

export default Index;
