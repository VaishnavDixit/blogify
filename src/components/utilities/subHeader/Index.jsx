import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./style.scss";
import {
    ArrowBack,
    ArrowBackIosNewOutlined,
    ArrowBackIosNewTwoTone,
    ChevronLeft,
} from "@mui/icons-material";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const SubHeader = ({text, backButton = true}) => {
    const navigate = useNavigate();
    return (
        <div className="subHeaderStyle d-flex align-items-center justify-content-center p-4">
            {backButton && (
                <span
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="py-1 ms-3 pt-2 px-2 hover-underline backBtn font1-regular"
                >
                    <ArrowBackIosNewTwoTone className="mb-1 me-1 arrowIcon" />
                    Back
                </span>
            )}
            {text && <h3 className="font1-thin mb-0">{text}</h3>}
        </div>
    );
};

export default SubHeader;
