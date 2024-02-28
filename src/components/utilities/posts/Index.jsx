import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import "./style.scss";
import service from "../../../appwrite/config";
import {Col, Row} from "react-bootstrap";
import {RemoveRedEye, ViewComfy} from "@mui/icons-material";
import Post from "../post/Index";

const Posts = ({queries}) => {
    const [posts, setPosts] = useState([]);
    console.log(queries);
    useEffect(() => {
        service.getPosts(queries).then((value) => {
            setPosts(value.documents);
        });
    }, []);
    return (
        <div className="postsStyle ps-md-0 ps-sm-0 container-fluid">
            <Row>
                {posts &&
                    posts.map((post) => (
                        <Post
                            post={post}
                        />
                    ))}
            </Row>
        </div>
    );
};

export default Posts;
