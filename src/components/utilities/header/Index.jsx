import React, {useState} from "react";
import "./style.scss";
import authService from "../../../appwrite/auth.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {PersonSharp} from "@mui/icons-material";
import {logout} from "../../../store/authSlice.js";
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "../dropdown/Index.jsx";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const signOut = async () => {
        try {
            console.log("sign out started");
            const session = await authService.logout();
            console.log(session);
            console.log("session founding...!");
            navigate("/");
            if (session) {
                console.log("session found!");
                localStorage.setItem("status", "");
                localStorage.setItem("userData", "");
                dispatch(logout());
            }
        } catch (error) {
            console.log("err in sign out:", error);
        }
    };

    return (
        <div className="headerStyle d-flex align-items-center justify-content-between p-3">
            <h2
                className="mainIcon josefin-sans-bolder mb-0 me-auto"
                onClick={() => navigate("/dashboard")}
            >
                Blogify
            </h2>
            <Button
                onClick={() => navigate("/dashboard/create-blog")}
                className="me-3 rounded-pill"
                variant="webdarkblue"
            >
                Create Blog
            </Button>
            <Dropdown
                displayButton={
                    <Button
                        type="button"
                        variant="webviolet"
                        className="btn btn-outline-webdarkblue rounded-circle accountLogo "
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <PersonSharp />
                    </Button>
                }
                options={[
                    {name: "My Blogs", func: () => navigate("/dashboard/my-blogs")},
                    {name: "Sign Out", func: signOut},
                ]}
            />
        </div>
    );
};

export default Header;
