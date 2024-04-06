import {
    BookmarksOutlined,
    Logout,
    Person2Outlined,
    PersonSharp,
    SummarizeOutlined,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import {logout} from "../../../store/authSlice.js";
import Dropdown from "../dropdown/Index.jsx";
import "./style.scss";

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
        <div className="headerStyle d-flex align-items-center justify-content-between px-3 py-3">
            <img src="/blogify-logo-white.svg" width={50}/>
            <h2
                className="mainIcon josefin-sans-thin mb-0 me-auto"
                onClick={() => navigate("/dashboard")}
            >
                Blogify
            </h2>
            {/* 
			this style to be decided
			<div className="curve curve1 "/>
			<div className="curve curve2 d-none d-md-block"/>
			<div className="curve curve3 d-none d-md-block"/>
			<div className="curve curve4 d-none d-md-block"/> */}
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
                    {
                        name: "Profile",
                        func: () => navigate("/dashboard/my-blogs"),
                        icon: <Person2Outlined className="mb-1 me-1" />,
                    },
                    {
                        name: "My Blogs",
                        func: () => navigate("/dashboard/my-blogs"),
                        icon: <SummarizeOutlined className="mb-1 me-1" />,
                    },
                    {
                        name: "Saved Blogs",
                        func: () => navigate("/dashboard/saved-blogs"),
                        icon: <BookmarksOutlined className="mb-1 me-1" />,
                    },
                    {name: "Sign Out", func: signOut, icon: <Logout className="mb-1 me-1" />},
                ]}
            />
        </div>
    );
};

export default Header;
