import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./style.scss";

const SubHeader = ({text}) => {
    return (
        <div className="subHeaderStyle d-flex align-items-center justify-content-center p-4">
            <h4 className="josefin-sans-thin">{text || "Blogify"}</h4>
        </div>
    );
};

export default SubHeader;
