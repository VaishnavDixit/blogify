import {
    ChevronRight,
    Close,
    CompareArrowsSharp,
    CompassCalibrationOutlined,
    CompassCalibrationTwoTone,
    Directions,
    Explore,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import service from "../../../appwrite/config.js";
import "./style.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {useNavigate} from "react-router-dom";

import {useGetTags} from "../../../queries/tags.js";
import {LoaderIcon} from "../../../assets/svgs.jsx";
import {RecommendedTopicsLoader} from "../loadingScreens/Index.jsx";
import {handleClickTag} from "../../../utilityFunctions/utilities.js";
import {useQueryClient} from "@tanstack/react-query";

const FeaturesPanel = () => {
    const queryClient = useQueryClient();

    const {data: tags, isLoading: isLoadingTags} = useGetTags();
    const navigate = useNavigate();
    const onClickTag = (tag, navigate) => {
        handleClickTag(tag, navigate);
    };
    return (
        <div className="featuresPanelStyle py-4 border-bottom">
            <h5 className="josefin-sans-thin text-center mb-3 ">Explore other Topics 🧭</h5>
            {isLoadingTags ? (
                <div className="d-flex flex-wrap justify-content-start">
                    <RecommendedTopicsLoader />
                </div>
            ) : (
                <div className="tagsDiv">
                    {tags?.documents?.map((tag, index) => (
                        <Button
                            key={index + 1}
                            variant="outline-primary"
                            className="me-2 mb-2 pb-1 rounded-pill josefin-sans-thin"
                            onClick={() => onClickTag(tag, navigate)}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeaturesPanel;
