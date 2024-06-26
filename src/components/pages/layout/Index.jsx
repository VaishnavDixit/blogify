import React from "react";
import {Route, Routes} from "react-router-dom";
import routes from "../../../../routes";
import Header from "../../utilities/header/Index.jsx";
import DashBoardDefaultLayout from "../../views/dashboardDefaultView/Index.jsx";
import "./style.scss";
const Index = () => {
    return (
        <div className="defaultlayout">
            <Header />
            <Routes>
                <Route index element={<DashBoardDefaultLayout />} />
                {routes.map((item, index) => (
                    <Route key={index + 1} path={item.path} element={item.element} />
                ))}
                <Route path="*" element={<>Path is invalid :/</>} />
            </Routes>
        </div>
    );
};

export default Index;
