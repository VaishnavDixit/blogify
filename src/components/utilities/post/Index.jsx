import {
    BookmarkBorderSharp,
    BookmarkRemoveSharp,
    Lens,
    MoreHorizRounded,
    Person,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import service from "../../../appwrite/config.js";
import userDataService from "../../../appwrite/userData.js";
import Dropdown from "../dropdown/Index.jsx";
import "./style.scss";

import {dateFormat, snackbar} from "../../../utilityFunctions/utilities.js";
const Post = ({post}) => {
    const {title, content, description, featuredImage, publisher, $id, $createdAt, tags, savedBy} =
        post;
    const [saved, setSaved] = useState(false);
    const [curUser, setCurUser] = useState({});
    useEffect(() => {
        (async () => {
            const curUser = await authService.getCurrentUser();
            setCurUser(curUser);
            console.log(savedBy);
            savedBy?.map(({$id}) => {
                if ($id == curUser.$id) setSaved(true);
            });
        })();
    }, []);

    const navigate = useNavigate();

    const handleOnClickPost = () => {
        navigate(`/dashboard/view/${$id}`);
    };

    const handleOnClickName = () => {
        navigate(`/dashboard/profile/${publisher && publisher.name}`, {
            state: {userId: publisher?.$id},
        });
    };

    const handleSaveBlog = async () => {
        const res = await userDataService.bookmarkBlog(curUser && curUser?.$id, $id, !saved);
        if (res) {
            snackbar("success", !saved ? "Added to bookmarks" : "removed from bookmarks");
            setSaved((p) => !p);
        }
    };

    return (
        <Col sm={12} xs={12} className="px-4">
            <div className="py-3 d-flex justify-content-between post">
                <div className="textContent">
                    <h3 className="josefin-sans-bolder line-wrap3" onClick={handleOnClickPost}>
                        {title}
                    </h3>
                    <div
                        onClick={handleOnClickPost}
                        className="cardo-regular line-wrap2 contentSection mb-0 me-3"
                    >
                        {description}
                    </div>
                    <div className="d-flex flex-wrap tagsSection">
                        {tags?.map((tag, index) => (
                            <div
                                key={index + 1}
                                className="tag px-3 pt-1 me-2 mb-2 rounded-pill josefin-sans"
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                    <div className="info mt-2 pb-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0 josefin-sans-thin text-truncate ">
                            <Person
                                onClick={handleOnClickName}
                                className="mb-1"
                                style={{fontSize: "1.8em"}}
                            />
                            <span
                                className=" josefin-sans-thin hover-underline"
                                onClick={handleOnClickName}
                            >
                                {publisher && publisher.name}
                            </span>
                            <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                            <span className=" josefin-sans-thin">{dateFormat($createdAt)}</span>
                        </p>
                        <div className="d-flex justify-content-end align-items-center">
                            {saved ? (
                                <BookmarkRemoveSharp
                                    onClick={handleSaveBlog}
                                    className="d-block pointer"
                                />
                            ) : (
                                <BookmarkBorderSharp
                                    onClick={handleSaveBlog}
                                    className="d-inline pointer"
                                />
                            )}
                            <Dropdown
                                displayButton={
                                    <MoreHorizRounded
                                        className="menuIcon"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    />
                                }
                                options={[
                                    {name: "Report", func: () => alert("reported!")},
                                    {name: "Test", func: () => alert("test 123 ;)!")},
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="imgContent d-flex align-items-start justify-content-end">
                    <img
                        onClick={handleOnClickPost}
                        src={service.getImgPreview(featuredImage)}
                    ></img>
                </div>
            </div>
        </Col>
    );
};

export default Post;
