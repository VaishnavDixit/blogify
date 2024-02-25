import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import "./style.scss";
import {useParams} from "react-router-dom";
import service from "../../../appwrite/config";
import { Lens, MoreHorizRounded, Person } from "@mui/icons-material";
const Index = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [image, setImage] = useState("");
    useEffect(() => {
        console.log(post);
        service.getPost(params?.slug).then((p) => {
            console.log(p);
            setPost(p);
            setImage(p.featuredImage);
        });
    }, []);
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
                    <div className="info pb-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0 josefin-sans-thin">
                            <Person className="mb-1" style={{fontSize: "2em"}} />
                            Vaishnav
                            <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                            13 Dec, 2019
                        </p>
                        <MoreHorizRounded />
                    </div>
                    {image ? <img src={service.getImgPreview(image) || ""} className="mt-3" /> : ""}
                    <div className="mt-3 content" dangerouslySetInnerHTML={{__html: post?.content}}></div>
                </Row>
            </Container>
        </>
    );
};

export default Index;
