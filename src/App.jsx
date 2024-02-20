import {useState} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import LandingPage from "./components/pages/auth/introduction/Index";
import SignInPage from "./components/pages/auth/signIn/Index";
import SignUpPage from "./components/pages/auth/signUp/Index";
import DefaultLayout from "./components/pages/defaultLayout/Index";
import { Container } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
