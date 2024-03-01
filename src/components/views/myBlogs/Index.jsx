import { Favorite, MoreHoriz } from "@mui/icons-material";
import { Query } from "appwrite";
import "bootstrap/dist/js/bootstrap.bundle";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../../../appwrite/auth";
import service from "../../../appwrite/config";
import { snackbar } from "../../../utilityFunctions/utilities";
import Dropdown from "../../utilities/dropdown/Index";
import SubHeader from "../../utilities/subHeader/Index";
import "./style.scss";
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
            snackbar("success", "Successfully deleted");
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
    // const [showBanner, setShowBanner] = useState(true);
    // const hideBannerHandler = () => setShowBanner(false);
    // const showBannerHandler = () => setShowBanner(true);
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
                            <img
                                className="me-4 d-none d-md-block"
                                src={service.getImgPreview(post?.featuredImage)}
                                alt="image"
                            />
                            <div className="titleAndInfo">
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
                                <p className="mb-0 d-flex blogInfo">
                                    <span className="josefin-sans-thin text-truncate me-auto">
                                        {moment(post.$createdAt).calendar()}
                                    </span>
                                    <span className="d-flex">
                                        <Favorite className="likeIcon me-1"/>
										<span className="me-2">{post.likes||0}</span>
                                        <Dropdown
                                            displayButton={
                                                <MoreHoriz
                                                    id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                />
                                            }
                                            options={[
                                                {name: "edit", func: () => alert("edit")},
                                                {
                                                    name: "Delete",
                                                    func: () => handleDeleteBlog(post.$id),
                                                },
                                            ]}
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
            </Container>
        </>
    );
};

export default Index;
