import {useState} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import LandingPage from "./components/pages/auth/introduction/Index";
import SignInPage from "./components/pages/auth/signIn/Index";
import SignUpPage from "./components/pages/auth/signUp/Index";
import DefaultLayout from "./components/pages/layout/Index";
import {Container} from "react-bootstrap";
import {SnackbarProvider} from "notistack";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <SnackbarProvider dense={true} autoHideDuration={2000}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/dashboard/*" element={<DefaultLayout />} />
                    <Route path={"*"} element={<>ERR: INVALID URL (:/)</>} />
                </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
