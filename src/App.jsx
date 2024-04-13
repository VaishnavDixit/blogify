import {useState} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import LandingPage from "./components/pages/auth/introduction/Index.jsx";
import SignInPage from "./components/pages/auth/signIn/Index.jsx";
import SignUpPage from "./components/pages/auth/signUp/Index.jsx";
import DefaultLayout from "./components/pages/layout/Index.jsx";
import {Container} from "react-bootstrap";
import {SnackbarProvider} from "notistack";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";
// import 'bootstrap/dist/css/bootstrap.min.css';
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider dense={true} autoHideDuration={2000} >
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
        </QueryClientProvider>
    );
}

export default App;
