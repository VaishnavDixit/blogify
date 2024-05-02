import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import "./style.scss";

const Dropdown = ({displayButton, options}) => {
    return (
        <div className="dropdown">
            {displayButton}
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {options.map(({name, func, icon}, index) => (
                    <li className="font2-regular" key={index}>
                        <button className="dropdown-item" onClick={func}>
                            {icon}
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
