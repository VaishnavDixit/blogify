import {Query} from "appwrite";
import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import authService from "../../../appwrite/auth";
import Posts from "../../utilities/posts/Index";
import SubHeader from "../../utilities/subHeader/Index";
import service from "../../../appwrite/config";
import "./style.scss";
import {MoreHoriz} from "@mui/icons-material";
import Dropdown from "../../utilities/dropdown/Index";
import "bootstrap/dist/js/bootstrap.bundle";
import {useNavigate} from "react-router-dom";
const Index = () => {
    // console.log(JSON.parse(localStorage.userData).$id)
    const [userId, setUserId] = useState("");
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        authService.getCurrentUser().then((res) => {
            setUserId(res.$id);
            service.getPosts([Query.equal("userId", res.$id)]).then((value) => {
                setPosts(value.documents);
            });
        });
    }, []);
    const handleDeleteBlog = async (slug) => {
        service.deletePost(slug).then((res) => {
            console.log(res);
            console.log("deletion done");
            service.getPosts([Query.equal("userId", userId)]).then((value) => {
                setPosts(value.documents);
                console.log(value.documents);
            });
        });
    };
    const handleOnClickPost = (slug) => {
        console.log(slug);
        navigate(`/dashboard/view/${slug}`);
    };
    return (
        <>
            <SubHeader text={`My Blogs`} />
            <Container className="myBlogs">
                {posts &&
                    posts.map((post, index) => (
                        <div
                            key={index}
                            className=" myBlog d-flex border-bottom align-items-start justify-content-start mb-4 pb-3"
                        >
                            <h3 className="index josefin-sans-thin me-4">{index + 1}.</h3>
                            <img className="me-4 d-none d-md-block" src={service.getImgPreview(post?.featuredImage)} alt="image" />
                            <div className="titleAndName me-auto">
                                <h4
                                    className="titleBlog line-wrap3 josefin-sans-bold mb-1"
                                    onClick={() => handleOnClickPost(post.$id)}
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                                    labore commodi, facere nisi harum, earum, dignissimos aut
                                    ratione similique numquam quo? Saepe ab dolores amet animi sequi
                                    culpa reprehenderit excepturi, aperiam repellat cupiditate,
                                    molestias tempore voluptatibus necessitatibus odit, consequatur
                                    blanditiis.
                                </h4>
                                <p className="mb-0 josefin-sans-thin dateInfo">{"25 Oct, 2021"}</p>
                            </div>
                            <span>
                                <Button className="me-3 pt-2 d-none rounded-pill d-md-inline">Edit</Button>
                                <Button
                                    className="d-none pt-2 d-md-inline rounded-pill"
                                    onClick={() => handleDeleteBlog(post.$id)}
                                >
                                    Delete
                                </Button>
                                <Dropdown
                                    displayButton={
                                        <MoreHoriz
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            className="d-md-none"
                                        />
                                    }
                                    options={[
                                        {name: "edit", func: () => alert("edit")},
                                        {name: "Delete", func: () => handleDeleteBlog(post.$id)},
                                    ]}
                                />
                            </span>
                        </div>
                    ))}
            </Container>
        </>
    );
};

export default Index;
