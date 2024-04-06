import {ChevronRight, Close} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import service from "../../../appwrite/config.js";
import "./style.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {useGetTags} from "../../../queries/tags.js";
import {LoaderIcon} from "../../../assets/svgs.jsx";
import {RecommendedTopicsLoader} from "../loadingScreens/Index.jsx";

const FeaturesPanel = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const {data: tags, isLoading: isLoadingTags} = useGetTags();

    const handleClickTag = (tagId) => {
        // tag id is same as tag name currently.
        setSelectedTags((prev) =>
            prev.length && prev.findIndex((i) => i == tagId) != -1
                ? [...prev.filter((t) => t != tagId)]
                : [...prev, tagId]
        );
    };
	
    return (
        <div className="featuresPanelStyle py-4 border-bottom">
            <h5 className="josefin-sans-thin text-center mb-3 ">Recommended Topics ✨</h5>
            {isLoadingTags ? (
                <div className="d-flex flex-wrap justify-content-start">
                    <RecommendedTopicsLoader />
                </div>
            ) : (
                tags?.documents?.map((tag, index) => (
                    <Button
                        key={index + 1}
                        variant={
                            selectedTags.length && selectedTags.findIndex((i) => i == tag.$id) != -1
                                ? "primary"
                                : "outline-primary"
                        }
                        className="me-2 mb-2 pb-1 rounded-pill josefin-sans-thin"
                        onClick={() => handleClickTag(tag?.$id)}
                    >
                        {tag.name}
                    </Button>
                ))
            )}
            {selectedTags.length !== 0 && (
                <div className=" mt-3 mb-1 d-flex">
                    <Button
                        variant="outline-webpinkred"
                        className="me-2 my-1 pt-1 pb-0 px-3 rounded-pill"
                        onClick={() => setSelectedTags([])}
                    >
                        Clear <Close className="mb-1" />
                    </Button>
                    <Button
                        variant="outline-primary"
                        className="me-2 my-1 pt-1 pb-0 px-3 rounded-pill"
                        onClick={() => setSelectedTags([])}
                    >
                        Show results <ChevronRight className="mb-1" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FeaturesPanel;
