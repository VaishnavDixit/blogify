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
import ProtectedRoutes from "./components/utilities/protectedRoutes/ProtectedRoutes.jsx";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider dense={true} autoHideDuration={2000}>
                <BrowserRouter>
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            <Route index element={<LandingPage />} />
                            <Route element={<ProtectedRoutes />}>
                                {routes.map((item, index) => (
                                    <Route
                                        key={index + 1}
                                        path={item.path}
                                        element={item.element}
                                    />
                                ))}
                            </Route>
                            <Route path="*" element={<>ERR: INVALID URL (:/)</>} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SnackbarProvider>
        </QueryClientProvider>
    );
}
export default App;
