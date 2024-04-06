import {Bookmark, Favorite, MoreHoriz} from "@mui/icons-material";
import {Query} from "appwrite";
import "bootstrap/dist/js/bootstrap.bundle";
import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import service from "../../../appwrite/config.js";
import {LoaderIcon} from "../../../assets/svgs.jsx";
import {useDeleteBlog, useGetPosts} from "../../../queries/blogs.js";
import {dateFormat, snackbar} from "../../../utilityFunctions/utilities.js";
import Dropdown from "../../utilities/dropdown/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import Skeleton from "react-loading-skeleton";

import "./style.scss";
const Index = () => {
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const curUser = JSON.parse(localStorage.getItem("userData"));
    const {
        data: myBlogs,
        isLoading: isLoadingMyBlogs,
        refetch: refetchGetPosts,
    } = useGetPosts([Query.equal("publisher", curUser && curUser?.$id)], curUser?.id);
    const {mutateAsync, isLoading} = useDeleteBlog(refetchGetPosts);
    const handleDeleteBlog = async (id) => {
        mutateAsync(id);
    };
	
    const handleOnClickPost = (slug) => {
        console.log(slug);
        navigate(`/dashboard/view/${slug}`);
    };

    return (
        <>
            <SubHeader text={`My Blogs ${isLoading ? "deleting..." : ""}`} />
            <Container className="myBlogs">
                {isLoadingMyBlogs ? (
                    <div className="d-flex justify-content-center mt-4">
                        {<LoaderIcon /> || "loading..."}
                    </div>
                ) : (
                    myBlogs &&
                    myBlogs?.documents?.map((post, index) => (
                        <div
                            key={index}
                            className=" myBlog d-flex border-bottom align-items-start justify-content-start py-4 pb-3"
                        >
                            <h3 className="index josefin-sans-thin me-4">{index + 1}.</h3>
                            <img
                                className="me-4 d-none d-md-block"
                                src={service.getImgPreview(post?.featuredImage)}
                                alt="image"
                            />
                            <div className="titleAndInfo px-4">
                                <h4
                                    className="titleBlog line-wrap3 josefin-sans-bold mb-3"
                                    onClick={() => handleOnClickPost(post.$id)}
                                >
                                    {post?.title}
                                </h4>
                                <div className="mb-0 d-flex blogInfo">
                                    <span className="josefin-sans-thin text-truncate me-auto">
                                        {dateFormat(post.$createdAt)}
                                    </span>
                                    <span className="d-flex">
                                        <Favorite className="likeIcon me-1" />
                                        <span className="me-2">
                                            {(post && post?.likedBy.length) || 0}
                                        </span>
                                        <Bookmark className="saveIcon me-1" />
                                        <span className="me-2">
                                            {(post && post?.savedBy.length) || 0}
                                        </span>
                                        <Dropdown
                                            displayButton={
                                                <MoreHoriz
                                                    id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                />
                                            }
                                            options={[
                                                {name: "Edit", func: () => alert("edit")},
                                                {
                                                    name: "Delete",
                                                    func: () => handleDeleteBlog(post.$id),
                                                },
                                            ]}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </Container>
        </>
    );
};

export default Index;
