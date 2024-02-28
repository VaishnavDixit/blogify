import {
	BookmarkBorderSharp,
	Lens,
	MoreHorizRounded,
	Person
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Dropdown from "../dropdown/Index";
import "./style.scss";

const BlogToolbar = ({options, publisherName, date}) => {
    return (
        <div className="info pb-2 d-flex justify-content-between align-items-center">
            <p className="mb-0 josefin-sans-thin text-truncate ">
                <Person className="mb-1" style={{fontSize: "1.8em"}} />
                {publisherName}
                <Lens className="mx-1 mb-1" style={{fontSize: ".3em"}} />
                {date}
            </p>
            <div className="d-flex justify-content-end align-items-center">
                <BookmarkBorderSharp className="saveIcon d-inline" />
                <Dropdown
                    displayButton={
                        <MoreHorizRounded
                            className="menuIcon"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        />
                    }
                    options={options}
                />
            </div>
        </div>
    );
};

export default BlogToolbar;
