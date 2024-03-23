import {AddAPhoto, CancelOutlined} from "@mui/icons-material";
import {Editor} from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import "react-image-crop/src/ReactCrop.scss";
import {useNavigate} from "react-router-dom";
import service from "../../../appwrite/config.js";
import {snackbar} from "../../../utilityFunctions/utilities.js";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";

const Index = () => {
    const [content, setContent] = useState("");
    const [finalImage, setFinalImage] = useState("");
    const [tags, setTags] = useState([]);
    // const userData = useSelector((state) => state.userData);
    const [selectedTags, setSelectedTags] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await service.getTags();
            console.log(res);
            setTags(res.documents);
        })();
    }, []);
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
    const handleClickTag = (tagId) => {
        // tag id is same as tag name currently.
        setSelectedTags((prev) =>
            prev.length && prev.findIndex((i) => i == tagId) != -1
                ? [...prev.filter((t) => t != tagId)]
                : [...prev, tagId]
        );
    };
    const submitBlog = async ({title, featuredImage}) => {
        if (!title || !featuredImage || content == "") {
            alert("invalid submission");
        }
        const slug = title
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
		.substring(0, 16)
		.trim()

        const publisher = JSON.parse(localStorage.getItem("userData")).$id;
        const uploadedFile = await service.uploadFile(featuredImage[0]);
        if (uploadedFile) {
            const id = uploadedFile.$id;
            service
                .createPost({
                    title,
                    slug,
                    featuredImage: id,
                    content,
                    publisher,
                    tags: selectedTags,
                })
                .then((res) => {
                    reset({title: ""});
                    setFinalImage("");
                    setContent("");
                    snackbar("success", "Successfully Created");
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
                <form onSubmit={handleSubmit(submitBlog)}>
                    <Row>
                        <Col sm={12} xs={12} className="mb-3">
                            <textarea
                                className="form-control titleInput"
                                type="text"
                                placeholder="Enter Title"
                                rows={1}
                                {...register("title", {required: true})}
                            />
                            {errors && errors.title}
                        </Col>
                        <Col sm={12} md={12} xs={12} className="mb-3">
                            {tags &&
                                tags?.map((tag) => (
                                    <Button
                                        className="me-2 my-1 py-1 rounded-pill"
                                        variant={
                                            selectedTags.length &&
                                            selectedTags.findIndex((i) => i == tag.$id) != -1
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        onClick={() => handleClickTag(tag?.$id)}
                                    >
                                        {tag.name}
                                    </Button>
                                ))}
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
