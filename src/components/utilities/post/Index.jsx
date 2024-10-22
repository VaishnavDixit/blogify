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
import {dateFormat, handleClickTag, snackbar} from "../../../utilityFunctions/utilities.js";
import {useGetCurrentUser} from "../../../queries/auth.js";
import BlankPFP from "../../../assets/blankProfilePicture.png";
const Post = ({
    post: {title, content, description, featuredImage, publisher, $id, $createdAt, tags, savedBy},
}) => {
    const [saved, setSaved] = useState(false);
    // const [curUser, setCurUser] = useState({});
    const {data: curUser} = useGetCurrentUser();
    useEffect(() => {
        savedBy?.map(({$id}) => {
            if ($id == curUser?.$id) setSaved(true);
        });
    }, [curUser]);

    const navigate = useNavigate();

    const handleOnClickPost = () => {
        navigate(`/view/${$id}`);
    };

    const handleOnClickName = () => {
        navigate(`/profile/${publisher && publisher.name}`, {
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
        <Col sm={12} xs={12} className="px-0">
            {/* <pre>{JSON.stringify(publisher, null, 2)}</pre> */}

            <div className="py-4 d-flex justify-content-between post">
                <div className="textContent">
                    <h3 className="font1-bolder line-wrap3 pointer" onClick={handleOnClickPost}>
                        {title}
                    </h3>
                    <div
                        onClick={handleOnClickPost}
                        className=" font2-regular line-wrap2 contentSection mb-0 me-3 pointer"
                    >
                        {description}
                    </div>
                    <div className="d-flex flex-wrap tagsSection">
                        {tags &&
                            tags?.map((tag, index) => (
                                <div
                                    key={index + 1}
                                    className="tag px-3 pt-1 me-2 mb-2 rounded-pill font1-regular pointer"
                                    onClick={() => handleClickTag(tag, navigate)}
                                >
                                    {tag.name}
                                </div>
                            ))}
                    </div>
                    <div className="info mt-2 pb-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0 font1-thin text-truncate ">
                            <img
                                className="profilePicture rounded-circle"
                                src={(publisher && publisher?.profilePicture) || BlankPFP}
                            />
                            <span
                                className="font1-thin hover-underline ps-2"
                                onClick={handleOnClickName}
                            >
                                {publisher && publisher?.name}
                            </span>
                            <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                            <span className=" font1-thin">{dateFormat($createdAt)}</span>
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
                            {/* <Dropdown
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
                            /> */}
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
