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
        <div className="headerStyle d-flex align-items-center justify-content-between p-3">
            <h2 className="josefin-sans-bolder mb-0 me-auto">Blogify</h2>
            <Button onClick={signOut} className="me-3" variant="webviolet">
                Create Blog
            </Button>
            <Button
                // onClick={signOut}
                type="button" 
				variant="webviolet"
                className="btn btn-outline-webviolet accountLogo"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <PersonSharp />
            </Button>
            {/* <div class="dropdown">
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a class="dropdown-item" href="#">
                            Action
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Another action
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </div> */}
            {/* <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Dropdown button
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a class="dropdown-item" href="#">
                            Action
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Another action
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </div> */}
        </div>
    );
};

export default Header;
