import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import { useQueryClient } from "@tanstack/react-query";
import { useGetTags } from "../../../queries/tags.js";
import { handleClickTag } from "../../../utilityFunctions/utilities.js";
import { RecommendedTopicsLoader } from "../loadingScreens/Index.jsx";

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
            <h4 className="font1-regular text-center mb-3 ">Explore trending Topics 🧭</h4>
            {isLoadingTags ? (
                <div className="d-flex flex-wrap justify-content-start">
                    <RecommendedTopicsLoader />
                </div>
            ) : (
                <div className="tagsDiv">
                    {tags?.documents &&
                        tags?.documents?.map((tag, index) => (
                            <Button
                                key={index + 1}
                                variant="outline-primary"
                                className="me-2 mb-2 pb-1 rounded-pill font1-thin"
                                onClick={() => onClickTag(tag)}
                            >
                                {tag.name}
                            </Button>
                        ))}
                    {/* <pre>
                        {JSON.stringify(
                            tags?.documents?.sort((a, b) => b?.blogs?.length - a?.blogs?.length),
                            null,
                            2
                        )}
                    </pre> */}
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
