import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import authService from "./appwrite/auth";
import LandingPage from "./components/pages/auth/landingPage/Index";
import SignInPage from "./components/pages/auth/signIn/Index";
import SignUpPage from "./components/pages/auth/signUp/Index";
import DefaultLayout from "./components/pages/defaultLayout/Index";
import {login, logout} from "./store/authSlice";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     authService
    //         .getCurrentUser()
    //         .then((userData) => {
    //             if (userData)
    //                 dispatch(login(userData)); //userData can be accessed as actions.payload
    //             else dispatch(logout());
    //         })
    //         .finally(() => setLoading(false));
    // }, []);
    // if (loading) return "loading...";
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/dashboard/*" element={<DefaultLayout />} />
                <Route path={"*"} element={<>invalid url :/</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
