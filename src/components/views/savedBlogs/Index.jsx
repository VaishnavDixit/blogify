import {MoreHoriz} from "@mui/icons-material";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import service from "../../../appwrite/config.js";
import {LoaderIcon} from "../../../assets/svgs.jsx";
import {useGetPosts} from "../../../queries/blogs.js";
import {dateFormat} from "../../../utilityFunctions/utilities.js";
import Dropdown from "../../utilities/dropdown/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";
import { Query } from "appwrite";
const Index = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userData"));
    const {data: savedBlogs, isLoading: isLoadingSavedBlogs} = useGetPosts([]);

    const handleDeleteBlog = async (slug) => {
        // service.deletePost(slug).then((res) => {
        //     console.log(res);
        //     console.log("deletion done");
        //     service.getPosts([Query.equal("userId", userId)]).then((value) => {
        //         console.log(value.documents);
        //     });
        // });
    };

    const handleOnClickPost = (slug) => {
        console.log(slug);
        navigate(`/dashboard/view/${slug}`);
    };

    return (
        <>
            <SubHeader text={`Saved Blogs`} />
            <Container className="savedArticles">
                {isLoadingSavedBlogs ? (
                    <div className="d-flex justify-content-center mt-4">{LoaderIcon}</div>
                ) : (
                    savedBlogs &&
                    savedBlogs?.documents &&
                    savedBlogs?.documents
                        ?.filter(
                            (document) =>
                                document.savedBy.findIndex((saver) => saver.$id == user?.$id) != -1
                        )
                        .map((post, index) => (
                            <div
                                key={index}
                                className=" myBlog d-flex align-items-start justify-content-start mb-4 pb-3"
                            >
                                <h3 className="index josefin-sans-thin me-4">{index + 1}.</h3>
                                <img
                                    className="me-4 d-none d-md-block"
                                    src={service.getImgPreview(post?.featuredImage)}
                                    alt="image"
                                />
                                <div className="titleAndName me-auto">
                                    <h4
                                        className="titleBlog line-wrap3 josefin-sans-bold mb-1"
                                        onClick={() => handleOnClickPost(post.$id)}
                                    >
                                        {post.title}
                                    </h4>
                                    <p className="mb-0 josefin-sans-thin dateInfo">
                                        {dateFormat(post.$createdAt)}
                                    </p>
                                </div>
                                <span>
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
                        ))
                )}
            </Container>
        </>
    );
};

export default Index;
