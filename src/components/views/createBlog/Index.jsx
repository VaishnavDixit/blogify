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
import {useLocation} from "react-router-dom";
import {useGetPost} from "../../../queries/blogs.js";
import {useGetTags} from "../../../queries/tags.js";
import {TagsListLoader} from "../../utilities/loadingScreens/Index.jsx";
import Header from "../../utilities/header/Index.jsx";

const Index = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState("");
    const [finalImage, setFinalImage] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const {data: toEditData, isLoadingData} = useGetPost(location?.state?.id || "");
    const {data: tags, isLoading: isLoadingTags} = useGetTags();
    useEffect(() => {
		console.log('uesEff')
        if (!toEditData || toEditData == undefined) return;
        setSelectedTags(location?.state?.id ? toEditData?.tags?.map((item) => item.name) : []);
        setContent(location?.state?.id ? toEditData?.content : []);
        setFinalImage(
            location?.state?.id && toEditData
                ? service.getImgPreview(toEditData?.featuredImage)
                : ""
        );
    }, [toEditData]);

    const onchange = (d) => {
        setContent(d);
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const imgsize = file.size / 1024 <= 500;
        const imgType = file.name.match(/\.(jpg|jpeg|png)$/);
        if (imgsize && imgType) {
            const base64 = await convertBase64(file);
            console.log(base64);
            setFinalImage(base64);
        } else {
            if (!imgsize) snackbar("error", "The image size should be less than 500KB");
            if (!imgType) snackbar("error", "The File Type should be in jpg ,jpeg or png");
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
        setSelectedTags((prev) =>
            prev && prev?.length && prev.findIndex((i) => i == tagId) != -1
                ? [...prev.filter((t) => t != tagId)]
                : [...prev, tagId]
        );
    };

    const submitBlog = async ({title, featuredImage, description}) => {
        console.log({title, featuredImage, description});
        if (!title || !featuredImage || content == "") {
            alert("invalid submission");
        }

        const slug = title
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .substring(0, 16);

        const publisher = JSON.parse(localStorage.getItem("userData")).$id;
        console.log(featuredImage[0]);
        const uploadedFile = await service.uploadFile(featuredImage[0]);

        if (uploadedFile) {
            const id = uploadedFile.$id;
            service
                .createPost(slug, {
                    title,
                    description,
                    featuredImage: id,
                    content,
                    publisher: publisher,
                    tags: selectedTags,
                })
                .then((res) => {
                    reset({title: "", description: ""});
                    setFinalImage("");
                    setContent("");
                    snackbar("success", "Successfully Created");
                    navigate(`/view/${slug}`);
                });
        } else {
            console.log("not uploaded :/");
        }
    };
    const submitBlogUpdated = async ({title, featuredImage, description}) => {
        console.log("update fn");
        console.log({title, featuredImage, description});
        if (!title || !featuredImage || content == "") {
            alert("invalid submission");
        }
        var arr = finalImage.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr?.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], "filename", {type: mime});
        const uploadedFile = await service.uploadFile(file);

        service
            .updatePost(slug, {
                title,
                description,
                featuredImage: uploadedFile?.$id,
                content,
                publisher,
                tags: selectedTags,
            })
            .then((res) => {
                reset({title: "", description: ""});
                setFinalImage("");
                setContent("");
                snackbar("success", "Successfully Updated");
                navigate(`/view/${slug}`);
            });
    };
    return (
        <>
            {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}
            <Header />
            <SubHeader text={"Create a blog"} />
            <Container className="createBlogPage">
                <form onSubmit={handleSubmit(location.state?.id ? submitBlogUpdated : submitBlog)}>
                    <Row>
                        <Col sm={12} xs={12} className="mb-3">
                            <textarea
                                className="form-control titleInput"
                                type="text"
                                placeholder="Enter Title"
                                rows={3}
                                defaultValue={toEditData ? toEditData.title : undefined}
                                {...register("title", {required: true})}
                            />
                            {errors && errors.title}
                        </Col>
                        <Col sm={12} md={12} xs={12} className="mb-3">
                            {isLoadingTags ? (
                                <TagsListLoader />
                            ) : (
                                tags &&
                                tags?.documents?.map((tag, index) => (
                                    <Button
                                        key={index + 1}
                                        className="me-2 my-1 py-1 rounded-pill"
                                        variant={
                                            selectedTags &&
                                            selectedTags?.length &&
                                            selectedTags.findIndex((i) => i == tag.$id) != -1
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        onClick={() => handleClickTag(tag?.$id)}
                                    >
                                        {tag.name}
                                    </Button>
                                ))
                            )}
                        </Col>
                        <Col sm={12} xs={12} className="mb-3">
                            <textarea
                                className="form-control titleInput"
                                type="text"
                                placeholder="Description"
                                rows={3}
                                defaultValue={toEditData ? toEditData.description : undefined}
                                {...register("description", {required: true})}
                            />
                            {errors && errors.title}
                        </Col>
                        <Col sm={12} md={4} xs={12} className="mb-3">
                            <label className="imageInputLabel d-flex align-items-center justify-content-center">
                                {finalImage ? (
                                    <>
                                        <img src={finalImage} defaultValue={finalImage} />
                                        <CancelOutlined
                                            className="cancelIcon"
                                            onClick={handleOnClickCancelImage}
                                        />
                                    </>
                                ) : (
                                    <p className="labelText font1-bold text-center mb-0">
                                        <AddAPhoto className="mb-2 me-1 addPhotoIcon" />
                                        Upload Photo
                                    </p>
                                )}
                                <input
                                    className="form-control d-none"
                                    type="file"
                                    defaultValue={finalImage}
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
                                {location?.state?.id ? "Update" : "Submit"} Blog
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
