import React, {Suspense, useState} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import {Container} from "react-bootstrap";
import {SnackbarProvider} from "notistack";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";

const LandingPage = React.lazy(() => import("./components/pages/auth/introduction/Index.jsx"));
const SignInPage = React.lazy(() => import("./components/pages/auth/signIn/Index.jsx"));
const SignUpPage = React.lazy(() => import("./components/pages/auth/signUp/Index.jsx"));
const DefaultLayout = React.lazy(() => import("./components/pages/layout/Index.jsx"));
const LoadingFallback = React.lazy(() => import("./components/pages/loadingFallback/Index.jsx"));

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider dense={true} autoHideDuration={2000}>
                <BrowserRouter>
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            <Route index element={<LandingPage />} />
                            <Route path="/sign-in" element={<SignInPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route path="/dashboard" element={<DefaultLayout />} />
                            <Route path="*" element={<>ERR: INVALID URL (:/)</>} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SnackbarProvider>
        </QueryClientProvider>
    );
}

export default App;
