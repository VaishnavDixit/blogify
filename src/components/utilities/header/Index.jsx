import {Add, BookmarksOutlined, HdrPlusOutlined, Logout, Person2Outlined, PlusOne, SummarizeOutlined} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth.js";
import BlankPFP from "../../../assets/blankProfilePicture.png";
import {useGetUserData} from "../../../queries/auth.js";
import {logout} from "../../../store/authSlice.js";
import Dropdown from "../dropdown/Index.jsx";
import "./style.scss";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curUser = JSON.parse(localStorage.getItem("userData"));

    const {data: userInfo, refetchUserData} = useGetUserData(curUser && curUser?.$id);

    const [personalInfo, setPersonalInfo] = useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const {providerAccessToken} = await authService.getSession();
                const userPersonalInfo = await authService.fetchGoogleUserData(providerAccessToken);
                setPersonalInfo(userPersonalInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        if (!personalInfo) {
            fetchUserInfo();
        }
    }, [personalInfo]);
    const signOut = async () => {
        try {
            const session = await authService.logout();
            navigate("/");
            if (session) {
                localStorage.setItem("status", "");
                localStorage.setItem("userData", "");
                dispatch(logout());
            }
        } catch (error) {
            console.log("err in sign out:", error);
        }
    };

    return (
        <div className="headerStyle d-flex align-items-center justify-content-between ">
            <img src="/blogify-logo-white.svg" width={45} className="m-2" />
            <h2
                className="mainIcon font1-thin mb-0 me-auto pointer"
                onClick={() => navigate("/dashboard")}
            >
                Blogify
            </h2>
            {/* <pre>{JSON.stringify(personalInfo, null, 2)}</pre>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre> */}
            <Button
                onClick={() => navigate("/create-blog")}
                className="me-3 rounded-pill d-none d-sm-block"
                variant="webdarkblue"
            >
                Create Blog
            </Button>
            <Button
                onClick={() => navigate("/create-blog")}
                className="me-3 rounded-pill d-sm-none"
                variant="webdarkblue"
            >
                <Add/> Blog
            </Button>
            {userInfo && (
                <Dropdown
                    displayButton={
                        <img
                            type="button"
                            variant="webviolet"
                            className="rounded-circle accountLogo pointer lazy"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            src={
                                personalInfo && personalInfo.picture
                                    ? personalInfo.picture
                                    : BlankPFP
                            }
                            alt="pfp"
                        />
                    }
                    options={[
                        {
                            name: "Profile",
                            func: () =>
                                navigate(`/profile/${personalInfo?.name}`, {
                                    state: {userId: curUser?.$id},
                                }),
                            // navigate("/dashboard/create-blog", {
                            // 	//         state: {id: id},
                            // 	//     });
                            icon: <Person2Outlined className="mb-1 me-1" />,
                        },
                        {
                            name: "My Blogs",
                            func: () => navigate("/my-blogs"),
                            icon: <SummarizeOutlined className="mb-1 me-1" />,
                        },
                        {
                            name: "Saved Blogs",
                            func: () => navigate("/saved-blogs"),
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
