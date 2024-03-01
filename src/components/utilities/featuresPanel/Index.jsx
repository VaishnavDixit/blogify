import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth";
import {logout} from "../../../store/authSlice";
import "./style.scss";
import {Button} from "react-bootstrap";
import service from "../../../appwrite/config";
import {ArrowRightAltSharp, ChevronRight, Close, CloseOutlined} from "@mui/icons-material";

const FeaturesPanel = () => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleClickTag = (tagId) => {
        // tag id is same as tag name currently.
        setSelectedTags((prev) =>
            prev.length && prev.findIndex((i) => i == tagId) != -1
                ? [...prev.filter((t) => t != tagId)]
                : [...prev, tagId]
        );
    };
    useEffect(() => {
        (async () => {
            const res = await service.getTags();
            console.log(res);
            setTags(res.documents);
        })();
    }, []);
    return (
        <div className="featuresPanelStyle py-4 border-bottom">
            <h5 className="josefin-sans-bold text-center mb-3">Recommended Topics</h5>
            {tags?.map((tag) => (
                <Button
                    variant={
                        selectedTags.length && selectedTags.findIndex((i) => i == tag.$id) != -1
                            ? "primary"
                            : "outline-primary"
                    }
                    className="me-2 my-1 py-1 rounded-pill"
                    onClick={() => handleClickTag(tag?.$id)}
                >
                    {tag.name}
                </Button>
            ))}
            {selectedTags.length !== 0 && (
                <div className=" mt-3 mb-1 d-flex">
                    <p className="mb-0 me-auto clearText josefin-sans-bold rounded-pill border ps-2 pt-1 pe-1" onClick={()=>setSelectedTags([])}>Clear <Close className="mb-1"/></p>
                    <p className="mb-0 showText josefin-sans-bold rounded-pill border ps-2 pt-1 pe-1">
                        Show results <ChevronRight className="mb-1" />
                    </p>
                </div>
            )}
        </div>
    );
};

export default FeaturesPanel;
