import React, {useState} from "react";
import "./style.scss";
import authService from "../../../appwrite/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {PersonSharp} from "@mui/icons-material";
import {logout} from "../../../store/authSlice";
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    useSelector((state) => {
        if (state.status) {
        }
    });
    const signOut = async () => {
        try {
            const session = await authService.logout();
            if (session) {
                localStorage.setItem("status", false);
                dispatch(logout());
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="featuresPanelStyle p-2">
            <p className="josefin-sans-bold mb-0">Topics:</p>
			<ul>
				<li>asdf </li>
				<li>asdf </li>
				<li>asdf </li>
				<li>asdf </li>
				<li>asdf </li>
				<li>asdf </li>
			</ul>
        </div>
    );
};

export default Header;
