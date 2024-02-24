import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import "./style.scss";
import service from "../../../appwrite/config";
import {Col, Row} from "react-bootstrap";
import {RemoveRedEye, ViewComfy} from "@mui/icons-material";
import Post from "../post/Index";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts([]).then((value) => {
            setPosts(value.documents);
        });
    }, []);
    return (
        <div className="postsStyle container-fluid">
            <Row className="g-3">
                {posts &&
                    posts.map((post) => (
                        <Post
                            title={post.title}
                            content={post?.content}
                            featuredImage={post.featuredImage}
                        />
                    ))}
            </Row>
        </div>
    );
};

export default Posts;
