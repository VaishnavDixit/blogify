import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../appwrite/config";
import BlogToolbar from "../../utilities/blogToolbar/Index";
import "./style.scss";

const Index = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        console.log(post);
        service.getPost(params?.slug).then((p) => {
            console.log(p);
            setPost(p);
            setImage(p.featuredImage);
        });
    }, []);
    const handleDeleteBlog = async () => {
        service.deletePost(params?.slug).then((res) => {
            console.log(res);
            console.log("deletion done");
            navigate("/dashboard/my-blogs");
        });
    };
    return (
        <>
            <Container className="viewBlogPage">
                <Row className="pt-3">
                    <h2 className="josefin-sans-bolder mt-3">
                        {post?.title}
                        {post?.title}
                        {post?.title}
                        {post?.title}
                        {post?.title}
                    </h2>
                    <BlogToolbar
                        options={[
                            {name: "delete", func: () => handleDeleteBlog()},
                            {name: "etst", func: () => alert("test 123 ;)!")},
                        ]}
                    />
                    {image ? <img src={service.getImgPreview(image) || ""} className="mt-3" /> : ""}
                    <div
                        className="mt-3 content"
                        dangerouslySetInnerHTML={{__html: post?.content}}
                    ></div>
                </Row>
            </Container>
        </>
    );
};

export default Index;
