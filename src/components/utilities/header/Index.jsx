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
                localStorage.setItem("userData", false);
                dispatch(logout());
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="headerStyle d-flex align-items-center justify-content-between p-3">
            <h2 className="mainIcon josefin-sans-bolder mb-0 me-auto" onClick={() => navigate("/dashboard")}>
                Blogify
            </h2>
            <Button onClick={() => navigate("create-blog")} className="me-3" variant="webdarkblue">
                Create Blog
            </Button>
            <Button
                // onClick={signOut}
                type="button"
                variant="webviolet"
                className="btn btn-outline-webdarkblue accountLogo"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={signOut}
            >
                <PersonSharp />
            </Button>
        </div>
    );
};

export default Header;
