import {
    BookmarkBorderSharp,
    BookmarkRemoveSharp,
    Favorite,
    FavoriteBorderSharp,
    Lens,
    MoreHorizRounded,
    Person,
} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import {useNavigate, useParams} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import service from "../../../appwrite/config.js";
import userDataService from "../../../appwrite/userData.js";
import {dateFormat, snackbar} from "../../../utilityFunctions/utilities.js";
import Dropdown from "../../utilities/dropdown/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";
import Skeleton from "react-loading-skeleton";
import {ViewBlogLoader} from "../../utilities/loadingScreens/Index.jsx";

import {useDeleteBlog, useGetPost, useGetPosts} from "../../../queries/blogs.js";

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
    const {data, refetch, isLoading} = useGetPost(params?.slug);
    console.log(data);
    const {refetch: refetchGetPosts} = useGetPosts();
    const {mutateAsync} = useDeleteBlog(refetchGetPosts);
    useEffect(() => {
        (async () => {
            setImage(data?.featuredImage);
            const curUser = await authService.getCurrentUser();
            setUserInfo(curUser);
            data &&
                data.savedBy?.map(({$id}) => {
                    if ($id == curUser.$id) setSaved(true);
                });
            data &&
                data.likedBy?.map((likingUser) => {
                    if (likingUser.$id == curUser.$id) setLiked(true);
                });
            setLikeCount(data && data?.likedBy.length);
        })();
    }, [data]);

    useEffect(() => {
        refetch();
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

    const handleDeleteBlog = () => {
        console.log(data);
        mutateAsync(params?.slug);
        navigate("/dashboard/my-blogs");
    };

    return (
        <>
            <SubHeader backButton text={""} />
            <Container className="viewBlogPage">
                {isLoading ? (
                    <ViewBlogLoader />
                ) : (
                    <Row className="pt-3">
                        <h2 className="josefin-sans-bolder mt-3">{data?.title}</h2>
                        {data?.description && <div className="my-3">{data?.description}</div>}
                        {image ? (
                            <img src={service.getImgPreview(image) || ""} className="mt-3" />
                        ) : null}
                        <div className="infoRow mt-3 d-flex justify-content-between align-items-center">
                            <p className="mb-0 text-truncate " onClick={handleOnClickName}>
                                <Person className="mb-2 me-1" style={{fontSize: "2em"}} />
                                <span className="hover-underline josefin-sans">
                                    {data && data?.publisher?.name}
                                </span>
                                <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                                <span className="josefin-sans">{dateFormat(data?.$createdAt)}</span>
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
                                    options={
                                        userInfo?.$id === data?.publisher?.$id
                                            ? [
                                                  {name: "Report", func: () => alert("reported!")},
                                                  {name: "Test", func: () => alert("test 123 ;)!")},
                                                  {
                                                      name: "Delete",
                                                      func: handleDeleteBlog,
                                                  },
                                              ]
                                            : [
                                                  {name: "Report", func: () => alert("reported!")},
                                                  {name: "Test", func: () => alert("test 123 ;)!")},
                                              ]
                                    }
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-wrap tagsSection my-3">
                            {isLoading ? (
                                <SkeletonLoader />
                            ) : (
                                data?.tags?.map((tag, index) => (
                                    <div
                                        key={index + 1}
                                        className="tag px-3 pt-1 me-2 mb-2 rounded-pill josefin-sans"
                                    >
                                        {tag.name}
                                    </div>
                                ))
                            )}
                        </div>
                        <div
                            className="mt-2 content"
                            dangerouslySetInnerHTML={{__html: data?.content}}
                        ></div>
                    </Row>
                )}
            </Container>
        </>
    );
};

const SkeletonLoader = () => (
    <div className="d-flex flex-wrap justify-content-start">
        <Skeleton style={{margin: "8px", width: "110px", height: "30px", borderRadius: "15px"}} />
        <Skeleton style={{margin: "8px", width: "70px", height: "30px", borderRadius: "15px"}} />
        <Skeleton style={{margin: "8px", width: "80px", height: "30px", borderRadius: "15px"}} />
        <Skeleton style={{margin: "8px", width: "60px", height: "30px", borderRadius: "15px"}} />
    </div>
);

export default Index;
