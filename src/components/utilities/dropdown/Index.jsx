import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import "./style.scss";

const Dropdown = ({displayButton, options}) => {
    return (
        <div className="dropdown">
            {displayButton}
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {options.map(({name, func}, index) => (
                    <li className="cardo-regular" key={index}>
                        <button className="dropdown-item" onClick={func}>
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
