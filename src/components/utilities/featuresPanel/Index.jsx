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
        <div className="featuresPanelStyle py-4 border-bottom">
			<h5 className="josefin-sans-bold text-center mb-3">Recommended Topics</h5>
            <Button className="me-2 my-1 py-1 rounded-pill ">Clot hing</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">Food</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">sdf</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">Mu sic</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">sdf </Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">Food</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">sdf sdf</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">Music</Button>
            <Button className="me-2 my-1 py-1 rounded-pill ">uiyurirtyiryuri</Button>
        </div>
    );
};

export default FeaturesPanel;
