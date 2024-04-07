import {
    BookmarksOutlined,
    Logout,
    Person2Outlined,
    PersonSharp,
    SummarizeOutlined,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
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
    const [personalInfo, setPersonalInfo] = useState({});
    useEffect(() => {
        (async () => {
            const {providerAccessToken} = await authService.getSession();
            console.log(providerAccessToken);
            const userPersonalInfo = await authService.fetchGoogleUserData(providerAccessToken);
            console.log(userPersonalInfo);
            setPersonalInfo(userPersonalInfo);
        })();
    }, []);
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
        <div className="headerStyle d-flex align-items-center justify-content-between pe-3 ps-1 py-2">
            <img src="/blogify-logo-white.svg" width={50} className="mb-2 me-1" />
            <h2
                className="mainIcon josefin-sans-thin mb-0 me-auto pointer"
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
            {personalInfo && (
                <Dropdown
                    displayButton={
                        <img
                            type="button"
                            variant="webviolet"
                            className="rounded-circle accountLogo pointer"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            src={personalInfo?.picture}
                        ></img>
                    }
                    options={[
                        {
                            name: "Profile",
                            func: () => navigate(`/dashboard/profile/${personalInfo?.name}`),
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
            )}
        </div>
    );
};

export default Header;
