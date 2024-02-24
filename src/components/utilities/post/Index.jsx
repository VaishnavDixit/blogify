import { RemoveRedEye } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col } from "react-bootstrap";
import service from "../../../appwrite/config";
import "./style.scss";

const Post = ({title, featuredImage}) => {
    return (
        <Col sm={12} xs={12}>
            <div className="post p-2">
                <h3 className="josefin-sans-bold">{title}{title}{title}</h3>
                <RemoveRedEye className="eyeIcon" />
                <img src={service.getImgPreview(featuredImage)}></img>
            </div>
        </Col>
    );
};

export default Post;
