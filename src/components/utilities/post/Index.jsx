import {
    BookmarkBorderSharp,
    BookmarkRemoveSharp,
    Lens,
    MoreHorizRounded,
    Person,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth";
import service from "../../../appwrite/config";
import userDataService from "../../../appwrite/userData";
import Dropdown from "../dropdown/Index";
import "./style.scss";
import {snackbar} from "../../../utilityFunctions/utilities";
const Post = ({post}) => {
    const {title, content, featuredImage, userId, $id, $createdAt} = post;
    const [saved, setSaved] = useState(false);

    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        // console.log(userInfo)
        (async () => {
            userDataService.getUserData(userId).then((res) => setUserInfo(res));
            const res = await authService.getCurrentUser();
            const user = await userDataService.getUserData(res.$id);
            setUserInfo(user);
            user.savedBlogs.map((blogId) => {
                if (blogId == $id) {
                    setSaved(true);
                }
            });
        })();
    }, []);
    // useEffect(() => {
    // }, []);
    const navigate = useNavigate();
    const handleOnClickPost = () => {
        navigate(`/dashboard/view/${$id}`);
    };
    const handleSaveBlog = async () => {
        const res = await userDataService.bookmarkBlog(userInfo?.$id, $id, !saved);
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
                        className="cardo-regular line-wrap2 contentSection mb-3 me-3"
                        // dangerouslySetInnerHTML={{__html: content}}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae esse
                        quo omnis perferendis doloribus officiis!
                    </div>
                    <div className="info pb-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0 josefin-sans-thin text-truncate ">
                            <Person className="mb-1" style={{fontSize: "1.8em"}} />
                            {userInfo && userInfo.name}
                            <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                            {moment($createdAt).calendar()}
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
                </div>
                <div className="imgContent d-flex align-items-start justify-content-end">
                    <img
                        onClick={handleOnClickPost}
                        src={service.getImgPreview(featuredImage)}
                    ></img>
                </div>
            </div>
            {/* <div className="post p-2" onClick={handleOnClickPost}>
                <h3 className="josefin-sans-bold">{title}</h3>
                <RemoveRedEye className="eyeIcon" />
                {/* <img src={service.getImgPreview(featuredImage)}></img> */}
            {/* <img src={'https://www.shutterstock.com/shutterstock/photos/526005658/display_1500/stock-photo-abstract-d-rendering-of-chaotic-structure-plexus-background-with-lines-and-polygonal-spheres-in-526005658.jpg'}></img> */}
            {/* </div> */}
        </Col>
    );
};

export default Post;
