import {useEffect, useState} from "react";
import "./App.scss";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/login/landingPage/Index";

import routes from "../routes";;
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData)
                    dispatch(login(userData)); //userData can be accessed as actions.payload
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, []);
    if (loading) return "loading...";
    return (
        <BrowserRouter>
            <Routes>
                <Route key="-1" index element={<LandingPage />}></Route>
                {routes.map((item, index) => (
                    <Route key={index} path={item.path} element={item.element}></Route>
                ))}
                <Route key="-2" path={"*"} element={<>invalid url :/</>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
