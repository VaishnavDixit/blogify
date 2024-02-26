import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../../../appwrite/config";
import BlogToolbar from "../blogToolbar/Index";
import "./style.scss";
const Post = ({title, content, featuredImage, id}) => {
    const navigate = useNavigate();
    const handleOnClickPost = () => {
        navigate(`/dashboard/view/${id}`);
    };
    return (
        <Col sm={12} xs={12} className="px-4">
            <div className="py-3 d-flex justify-content-between post">
                <div className="textContent">
                    <h3 className="josefin-sans-bolder" onClick={handleOnClickPost}>
                        {title}
                        {title}
                        {title}
                        {title}
                    </h3>
                    <pre
                        onClick={handleOnClickPost}
                        className="cardo-regular contentSection mb-3 me-3"
                        dangerouslySetInnerHTML={{__html: content}}
                    ></pre>
                    <BlogToolbar
                        publisherName="Vaishnav"
                        date="12 Dec,1997"
                        options={[
                            {name: "report", func: () => alert("reported!")},
                            {name: "test", func: () => alert("test 123 ;)!")},
                        ]}
                    />
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
