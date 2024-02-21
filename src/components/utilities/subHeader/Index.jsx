import React, {useState} from "react";
import "./style.scss";
import authService from "../../../appwrite/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {PersonSharp} from "@mui/icons-material";
import {logout} from "../../../store/authSlice";
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SubHeader = ({text}) => {
    
    return (
        <div className="subHeaderStyle d-flex align-items-center justify-content-center p-3">
            <h4 className="josefin-sans-thin">{text||'Blogify'}</h4>
        </div>
    );
};

export default SubHeader;
