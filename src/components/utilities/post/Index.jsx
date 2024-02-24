import {
	Lens,
    MenuTwoTone,
    MoreHorizRounded,
    MoreOutlined,
    Person,
    Person2Outlined,
    Person2Rounded,
    PersonPinCircleOutlined,
    RemoveRedEye,
	TripOrigin,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect} from "react";
import {Col} from "react-bootstrap";
import service from "../../../appwrite/config";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth";
import {Menu} from "@mui/material";
const Post = ({title, content, featuredImage, id}) => {
    const navigate = useNavigate();
    const handleOnClickPost = () => {
        navigate(`/dashboard/view/${id}`);
    };
    useEffect(() => {
        authService.getCurrentUser().then((res) => console.log(res));
    }, []);
    return (
        <Col sm={12} xs={12} className="px-4">
            <div className="py-3 d-flex justify-content-between post">
                <div className="textContent">
                    <div className="info pb-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0 josefin-sans-thin">
                            <Person className="mb-1" style={{fontSize: "2em"}} />
                            Vaishnav<Lens className='mx-1 mb-1' style={{fontSize: ".3em"}}/>13 Dec, 2019
                        </p>
                        <MoreHorizRounded />
                    </div>
                    <h3 className="josefin-sans-bolder" onClick={handleOnClickPost}>
                        {title}
                        {title}
                        {title}
                        {title}
                    </h3>
                    <pre
                        onClick={handleOnClickPost}
                        className="cardo-regular contentSection mb-0 me-3"
                        dangerouslySetInnerHTML={{__html: content}}
                    ></pre>
                </div>
                <div className="imgContent d-flex align-items-center">
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
