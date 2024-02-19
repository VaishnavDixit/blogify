import React, { useState } from "react";
import "./style.scss";
import authService from "../../../appwrite/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../../store/authSlice";
import { Button } from "react-bootstrap";
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
	const [name, setName] = useState('');
	useSelector(state=>{
		console.log(state)
		if(state.status){

		}
	})
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
        <div className="headerStyle d-flex align-items-center justify-content-between p-2">
            <span className="josefin-sans-bolder">Blogify</span>
            <Button onClick={signOut} variant='orange'>Sign out</Button>
        </div>
    );
};

export default Header;
