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
        console.log(state);
        if (state.status) {
        }
    });
    const signOut = async () => {
        try {
            const session = await authService.logout();
            console.log(session);
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
        <div className="subHeaderStyle d-flex align-items-center justify-content-center p-3">
            <h4 className="josefin-sans-thin">Welcome, Vaishnav</h4>
        </div>
    );
};

export default Header;
