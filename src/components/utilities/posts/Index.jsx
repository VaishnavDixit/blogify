import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {Row} from "react-bootstrap";
import {useGetPosts} from "../../../queries/blogs.js";
import Post from "../post/Index.jsx";
import "./style.scss";

const Posts = ({queries}) => {
    console.log(queries);
    const {data: posts, isLoading} = useGetPosts();
    console.log(posts);
    return (
        <div className="postsStyle ps-md-0 ps-sm-0 container-fluid">
            <Row>
                {posts &&
                    posts?.documents &&
                    posts?.documents?.map((post, index) => <Post key={index + 1} post={post} />)}
            </Row>
        </div>
    );
};

export default Posts;
