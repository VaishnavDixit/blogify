import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import routes from "../../../../routes";
import Header from "../../utilities/header/Index.jsx";
import DashBoardDefaultLayout from "../../views/dashboardDefaultView/Index.jsx";
import "./style.scss";
const Index = () => {
    return (
        <div className="defaultlayout">
            <Header />
			<DashBoardDefaultLayout />
			{/* <Outlet/> */}
            {/* <Routes>
                <Route index element={} />
                {routes.map((item, index) => (
                    <Route key={index + 1} path={item.path} element={item.element} />
                ))}
                <Route path="*" element={<>Path is invalid :/</>} />
            </Routes> */}
        </div>
    );
};

export default Index;
