import React from "react";
//routes
import LandingPage from "./src/components/login/landingPage/Index";
import SignInPage from "./src/components/login/signIn/Index";
import SignUpPage from "./src/components/login/signUp/Index";

const routes = [
    {path: "/sign-in", name: "Sign In", element: <SignInPage />},
    {path: "/sign-up", name: "SignUp", element: <SignUpPage />},
];
export default routes;
