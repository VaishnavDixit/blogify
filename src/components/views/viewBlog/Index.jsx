import {
    BookmarkBorderSharp,
    BookmarkRemoveSharp,
    Favorite,
    FavoriteBorderSharp,
    Lens,
    MoreHorizRounded,
    Person,
} from "@mui/icons-material";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import {useNavigate, useParams} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import service from "../../../appwrite/config.js";
import userDataService from "../../../appwrite/userData.js";
import {snackbar} from "../../../utilityFunctions/utilities.js";
import Dropdown from "../../utilities/dropdown/Index.jsx";
import "./style.scss";

const Index = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const p = await service.getPost(params?.slug);
                console.log(p);
                setPost(p);
                setImage(p.featuredImage);
                // const res = await authService.getCurrentUser();
                const user = p.publisher;
                console.log(user);
                setUserInfo(user);
                user &&
                    user.savedArticles?.map((blogId) => {
                        if (blogId == params?.slug) setSaved(true);
                    });
                console.log("test1");
                user &&
                    user.likedPosts?.map((blogId) => {
                        if (blogId == params?.slug) {
                            setLiked(true);
                        }
                    });
                console.log("test2");
            } catch (error) {
                alert(error);
            }
        })();
    }, [liked]);
    const handleDeleteBlog = async () => {
        service.deletePost(params?.slug).then((res) => navigate("/dashboard/my-blogs"));
    };
    const handleSaveBlog = async () => {
        const res = await userDataService.bookmarkBlog(
            userInfo?.$id,
            post.$id,
            saved ? false : true
        );
        if (res) {
            setSaved((p) => !p);
            snackbar("success", !saved ? "Added to bookmarks" : "removed from bookmarks");
        }
    };
    const handleLikePost = async () => {
        const res = await userDataService.likeBlog(params?.slug, userInfo?.$id, !liked);
        if (res) {
            setLiked((p) => !p);
            snackbar("success", !liked ? "Like added" : "Like removed");
        }
    };
    return (
        <>
            <Container className="viewBlogPage">
                <Row className="pt-3">
                    <h2 className="josefin-sans-bolder mt-3">{post?.title}</h2>
                    <div className="infoRow pb-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0 josefin-sans-thin text-truncate ">
                            <Person className="mb-2 me-1" style={{fontSize: "2em"}} />
                            {userInfo?.name}
                            <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                            {moment(post.$createdAt).calendar()}
                        </p>
                        <div className="d-flex justify-content-end align-items-center">
                            {liked ? (
                                <Favorite className="likeIcon" onClick={handleLikePost} />
                            ) : (
                                <FavoriteBorderSharp
                                    className="likeIcon"
                                    onClick={handleLikePost}
                                />
                            )}
                            <p className="mb-0 ps-1 pe-3">{post.likes || 0}</p>
                            {saved ? (
                                <BookmarkRemoveSharp
                                    onClick={handleSaveBlog}
                                    className="saveIcon d-inline"
                                />
                            ) : (
                                <BookmarkBorderSharp
                                    onClick={handleSaveBlog}
                                    className="saveIcon d-inline"
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
                                    {name: "report", func: () => alert("reported!")},
                                    {name: "test", func: () => alert("test 123 ;)!")},
                                ]}
                            />
                        </div>
                    </div>
                    {image ? <img src={service.getImgPreview(image) || ""} className="mt-3" /> : ""}
                    <div className="d-flex flex-wrap tagsSection my-3">
                        {post?.tags?.map((tag) => (
                            <div className="tag px-3 pt-1 me-2 mb-2 rounded-pill josefin-sans">
                                {tag.name}
                            </div>
                        ))}
                    </div>
                    <div
                        className="mt-3 content"
                        dangerouslySetInnerHTML={{__html: post?.content}}
                    ></div>
                </Row>
            </Container>
        </>
    );
};

export default Index;
