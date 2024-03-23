import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import "./style.scss";

const Tag = ({name, style = {background: '#E5E5E5'}}) => {
    return (
        <div style={{...style, background: '#E5E5E5'}} className="tag px-3 pt-1 me-2 mb-2 rounded-pill josefin-sans">
            {name}
        </div>
    );
};

export default Tag;
