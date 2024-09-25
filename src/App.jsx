import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import "bootstrap/dist/js/bootstrap.bundle";
import {SnackbarProvider} from "notistack";
import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import routes from "../routes.jsx";

const LandingPage = React.lazy(() => import("./components/pages/auth/introduction/Index.jsx"));
const DefaultLayout = React.lazy(() => import("./components/pages/layout/Index.jsx"));
import LoadingFallback from "./components/pages/loadingFallback/Index.jsx";
import DashBoardDefaultLayout from "./components/views/dashboardDefaultView/Index.jsx";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider dense={true} autoHideDuration={2000}>
                <BrowserRouter>
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            <Route index element={<LandingPage />} />
                            {routes.map((item, index) => (
                                <Route key={index + 1} path={item.path} element={item.element} />
                            ))}
                            <Route path="*" element={<>ERR: INVALID URL (:/)</>} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SnackbarProvider>
        </QueryClientProvider>
    );
}
// Many cheaters in this contest are using this exact code for question 4. This person has slightly altered the code to prevent getting caught. But in reality the code and implementation is the exacy copy of all the other cheaters. So this is a cheater. Its very saddening to see many hardworking coders like trying so hard to push our ratings, just to be overtaken by these cheaters. Please take strict action. Thanks.
export default App;
