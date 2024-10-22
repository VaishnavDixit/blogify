import {
    ArrowRightSharp,
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

    const {data: tags, isLoading: isLoadingTags} = useGetTags(4);
    const navigate = useNavigate();
    const onClickTag = (tag) => {
        handleClickTag(tag, navigate);
    };
    const onClickShowAll = () => {
        navigate("/allTags");
    };

    return (
        <div className="featuresPanelStyle py-4 border-bottom">
            <h4 className="font1-regular text-center mb-3 ">Explore other Topics 🧭</h4>
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
                            className="me-2 mb-2 pb-1 rounded-pill font1-thin"
                            onClick={() => onClickTag(tag)}
                        >
                            {tag.name}
                        </Button>
                    ))}
                    {/* {JSON.stringify(tags?.documents?.map((tag, index) => tag.name))} */}
                    {/* <div className="d-flex justify-content-end">
                        <Button variant="link" onClick={onClickShowAll}>
                            Show all
                            <ArrowRightSharp className="mb-1" />
                        </Button>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default FeaturesPanel;
