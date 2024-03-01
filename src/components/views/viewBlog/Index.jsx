import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import "react-image-crop/src/ReactCrop.scss";
import {useNavigate, useParams} from "react-router-dom";
import service from "../../../appwrite/config";
import BlogToolbar from "../../utilities/blogToolbar/Index";
import "./style.scss";
import {
    BookmarkAddTwoTone,
    BookmarkBorderSharp,
    BookmarkOutlined,
    BookmarkRemoveOutlined,
    BookmarkRemoveSharp,
    BookmarkRemoveTwoTone,
    BookmarkSharp,
    BookmarkTwoTone,
    CollectionsBookmarkSharp,
    Lens,
    MoreHoriz,
    MoreHorizOutlined,
    MoreHorizRounded,
    MoreHorizSharp,
    MoreHorizTwoTone,
    MoreTimeRounded,
    Person,
} from "@mui/icons-material";
import Dropdown from "../../utilities/dropdown/Index";
import moment from "moment";
import userDataService from "../../../appwrite/userData";
import authService from "../../../appwrite/auth";
import {snackbar} from "../../../utilityFunctions/utilities";

const Index = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [saved, setSaved] = useState(false);
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const p = await service.getPost(params?.slug);
            setPost(p);
            setImage(p.featuredImage);
            const res = await authService.getCurrentUser();
            const user = await userDataService.getUserData(res.$id);
            setUserInfo(user);
            user.savedBlogs.map((blogId) => {
                if (blogId == params?.slug) {
                    setSaved(true);
                }
            });
        })();
    }, []);
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
