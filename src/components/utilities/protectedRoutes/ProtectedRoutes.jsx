import React, {useEffect, useState} from "react";
import authService from "../../../appwrite/auth";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const [isAuth, setIsAuth] = useState(null);
    useEffect(() => {
		console.log("protectedRoute UE");
        authService
            .getCurrentUser()
            .then((res) => {
                console.log("cur user fetched, setting auth true. current isAuth:", isAuth);
                setIsAuth(true);
            })
            .catch((err) => {
				console.log("error. setting isAuth:", isAuth);
                setIsAuth(false);
            });
    }, []);
    if (isAuth==null) return <div>logging in...</div>;
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
