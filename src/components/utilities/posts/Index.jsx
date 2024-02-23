import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import "./style.scss";
import service from "../../../appwrite/config";
import {Col, Row} from "react-bootstrap";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts([]).then((value) => {
            setPosts(value.documents);
        });
    }, []);
    return (
        <div className="postsStyle container-fluid">
            <Row>
                <Col sm={12} xs={12}>
                    {posts &&
                        [...posts, ...posts, ...posts, ...posts, ...posts, ...posts].map((post) => (
                            <div className="post p-2 mb-3">
                                <p className="josefin-sans-bold">{post.title}</p>
                                <p className="cardo-regular">{post.content}</p>
                                <img src={service.getImgPreview(post?.featuredImage)}></img>
                            </div>
                        ))}
                </Col>
            </Row>
        </div>
    );
};

export default Posts;
