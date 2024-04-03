import {
	BookmarkBorderSharp,
	BookmarkRemoveSharp,
	Favorite,
	FavoriteBorderSharp,
	Lens,
	MoreHorizRounded,
	Person,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import service from "../../../appwrite/config.js";
import userDataService from "../../../appwrite/userData.js";
import { dateFormat, snackbar } from "../../../utilityFunctions/utilities.js";
import Dropdown from "../../utilities/dropdown/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";

const Index = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(false);
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const user = localStorage.getItem("userData");
    const handleOnClickName = () => {
        navigate(`/dashboard/profile/${userInfo && userInfo.name}`, {
            state: {userId: userInfo?.$id},
        });
    };
    useEffect(() => {
        (async () => {
            try {
                const p = await service.getPost(params?.slug);
                if (!p) throw "cant find publiser id";
                setPost(p);
                setImage(p.featuredImage);
                const curUser = await authService.getCurrentUser();
                setUserInfo(curUser);
                p &&
                    p.savedBy?.map(({$id}) => {
                        if ($id == curUser.$id) setSaved(true);
                    });
                p &&
                    p.likedBy?.map((likingUser) => {
                        if (likingUser.$id == curUser.$id) setLiked(true);
                    });
                setLikeCount(p && p.likedBy.length);
            } catch (error) {
                alert(error);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const p = await service.getPost(params?.slug);
            setLikeCount(p && p.likedBy.length);
        })();
    }, [liked]);
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
            <SubHeader backButton text={""} />
            <Container className="viewBlogPage">
                <Row className="pt-3">
                    <h2 className="josefin-sans-bolder mt-3">{post?.title}</h2>
                    {post?.description && <div className="my-3">{post?.description}</div>}
                    {image ? <img src={service.getImgPreview(image) || ""} className="mt-3" /> : null}
                    <div className="infoRow mt-3 d-flex justify-content-between align-items-center">
                        <p className="mb-0 text-truncate " onClick={handleOnClickName}>
                            <Person className="mb-2 me-1" style={{fontSize: "2em"}} />
                            <span className="hover-underline josefin-sans">{userInfo?.name}</span>
                            <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                            <span className="josefin-sans">{dateFormat(post.$createdAt)}</span>
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
                            <p className="mb-0 ps-1 pe-3">{likeCount || 0}</p>
                            {saved ? (
                                <BookmarkRemoveSharp
                                    onClick={handleSaveBlog}
                                    className="d-inline pointer"
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
                                    {name: "report", func: () => alert("reported!")},
                                    {name: "test", func: () => alert("test 123 ;)!")},
                                ]}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap tagsSection my-3">
                        {post?.tags?.map((tag, index) => (
                            <div
                                key={index + 1}
                                className="tag px-3 pt-1 me-2 mb-2 rounded-pill josefin-sans"
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                    <div
                        className="mt-2 content"
                        dangerouslySetInnerHTML={{__html: post?.content}}
                    ></div>
                </Row>
            </Container>
        </>
    );
};

export default Index;
