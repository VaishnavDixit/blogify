import {
	BookmarkBorderSharp,
	BookmarkRemoveSharp,
	Favorite,
	FavoriteBorderSharp,
	Lens,
	MoreHorizRounded
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../appwrite/config.js";
import BlankPFP from "../../../assets/blankProfilePicture.png";
import { dateFormat, handleClickTag, snackbar } from "../../../utilityFunctions/utilities.js";
import Dropdown from "../../utilities/dropdown/Index.jsx";
import { ViewBlogLoader } from "../../utilities/loadingScreens/Index.jsx";
import SubHeader from "../../utilities/subHeader/Index.jsx";
import "./style.scss";

import { useGetCurrentUser } from "../../../queries/auth.js";
import {
	useDeleteBlog,
	useGetPost,
	useGetPosts,
	useLikeUnlikeBlog,
	useSaveUnsaveBlog,
} from "../../../queries/blogs.js";
import Header from "../../utilities/header/Index.jsx";

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
        console.log(user);
        navigate(`/profile/${user && JSON.parse(user).name}`, {
            state: {userId: JSON.parse(user)?.$id},
        });
    };
    const {
        data: currentPost,
        refetch: refetchPost,
        isLoading,
        isFetched: isFetchedGetPost,
    } = useGetPost(params?.slug);
    const {data: currentUserAuth, isFetched: isFetchedGetCurrentUser} = useGetCurrentUser();
    const {refetch: refetchGetPosts} = useGetPosts();
    const {mutateAsync, isSuccess} = useDeleteBlog(refetchGetPosts);
    const {
        mutateAsync: handleLikeBlogMutateAsync,
        isSuccess: isSuccessLikeUnlikeBlog,
        status: likeStatus,
    } = useLikeUnlikeBlog();

    const {
        mutateAsync: handleSaveBlogMutateAsync,
        isSuccess: isSuccessSaveUnsaveBlog,
        status: saveStatus,
    } = useSaveUnsaveBlog();

    useEffect(() => {
        console.log(currentPost);
        console.log(currentUserAuth);
        if (!isFetchedGetCurrentUser || !isFetchedGetPost) return;
        setImage(currentPost?.featuredImage);
        currentPost &&
            currentPost.savedBy?.map((savingUserId) => {
                if (savingUserId === currentUserAuth.$id) setSaved(true);
            });
        currentPost &&
            currentPost.likedBy?.map((likingUserId) => {
                if (likingUserId === currentUserAuth.$id) setLiked(true);
            });
        setLikeCount(currentPost && currentPost?.likedBy?.length);
    }, [currentUserAuth, currentPost, isFetchedGetCurrentUser, isFetchedGetPost]);

    useEffect(() => {
        refetchPost();
    }, [liked]);

    const handleSaveBlog = async () => {
		console.log('ss')
        if (saveStatus == "pending") return;
        handleSaveBlogMutateAsync({blogId: params?.slug, toSave: !saved}).then((res) => {
            setSaved((prev) => !prev);
            snackbar("success", saved ? "Removed from bookmarks!" : "Added to bookamarks 🏷️!");
        });
    };

    const handleLikePost = async () => {
        if (likeStatus == "pending") return;
        handleLikeBlogMutateAsync({blogId: params?.slug, toLike: !liked}).then((res) => {
            setLiked((prev) => !prev);
            snackbar("success", liked ? "Liked removed!" : "Liked 👍🏼 added!");
        });
    };

    const handleDeleteBlog = () => {
        console.log(currentPost);
        mutateAsync(params?.slug);

        navigate("/my-blogs");
    };

    return (
        <>
            <Header />
            <SubHeader backButton text={""} />
            <Container className="viewBlogPage">
                {isLoading ? (
                    <ViewBlogLoader />
                ) : (
                    <Row className="pt-3">
                        {/* <pre>liked: {JSON.stringify(liked, null, 2)}</pre> */}
                        {/* <pre>currentPost: {JSON.stringify(currentPost, null, 2)}</pre> */}
                        {/* <pre>{JSON.stringify(userInfo, null, 2)}</pre> */}
                        <h2 className="font1-bolder mt-3">{currentPost?.title}</h2>
                        {currentPost?.description && (
                            <div className="my-3">{currentPost?.description}</div>
                        )}
                        {image ? (
                            <img src={service.getImgPreview(image) || ""} className="mt-3" />
                        ) : null}
                        <div className="infoRow mt-3 d-flex justify-content-between align-items-center">
                            <p className="mb-0 text-truncate " onClick={handleOnClickName}>
                                <img
                                    className="profilePicture me-2"
                                    src={currentPost?.publisher?.profilePicture || BlankPFP}
                                />
                                <span className="hover-underline font1-regular">
                                    {currentPost?.publisher && currentPost?.publisher?.name}
                                </span>
                                <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                                <span className="font1-regular">
                                    {dateFormat(currentPost?.$createdAt)}
                                </span>
                            </p>
                            <div className="d-flex justify-content-end align-items-center">
                                {liked ? (
                                    <Favorite
                                        className={`likeIcon ${
                                            likeStatus == "pending" ? "disabledText" : ""
                                        }`}
                                        onClick={handleLikePost}
                                    />
                                ) : (
                                    <FavoriteBorderSharp
                                        className={`likeIcon ${
                                            likeStatus == "pending" ? "disabledText" : ""
                                        }`}
                                        onClick={handleLikePost}
                                    />
                                )}
                                <p className="mb-0 ps-1 pe-3">{likeCount || 0}</p>
                                {saved ? (
                                    <BookmarkRemoveSharp
                                        onClick={handleSaveBlog}
                                        className={`d-inline pointer ${
                                            saveStatus == "pending" ? "disabledText" : ""
                                        }`}
                                    />
                                ) : (
                                    <BookmarkBorderSharp
                                        onClick={handleSaveBlog}
                                        className={`d-inline pointer ${
                                            saveStatus == "pending" ? "disabledText" : ""
                                        }`}
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
                                        userInfo?.$id === currentPost?.publisher?.$id
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
                                currentPost?.tags?.map((tag, index) => (
                                    <div
                                        key={index + 1}
                                        className="tag px-3 pt-1 me-2 mb-2 rounded-pill font1-regular"
                                        onClick={() => handleClickTag(tag, navigate)}
                                    >
                                        {tag.name}
                                    </div>
                                ))
                            )}
                        </div>
                        <div>
                            <div
                                className="mt-2 content"
                                dangerouslySetInnerHTML={{__html: currentPost?.content}}
                            />
                        </div>
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
