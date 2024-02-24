import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth";
import {logout} from "../../../store/authSlice";
import "./style.scss";
import { Button } from "react-bootstrap";

const FeaturesPanel = () => {
    return (
        <div className="featuresPanelStyle addShadow p-4">
			<h5 className="josefin-sans-bolder">Recommended Topics:</h5>
            <Button className="mx-1 my-1 py-1 rounded-pill ">Clothing</Button>
            <Button className="mx-1 my-1 py-1 rounded-pill ">Food</Button>
            <Button className="mx-1 my-1 py-1 rounded-pill ">Travel</Button>
            <Button className="mx-1 my-1 py-1 rounded-pill ">Music</Button>
            <Button className="mx-1 my-1 py-1 rounded-pill ">Tech</Button>
        </div>
    );
};

export default FeaturesPanel;
