import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import routes from "../../../../routes";
import Header from "../../utilities/header/Index";
import SubHeader from "../../utilities/subHeader/Index";
import FeaturesPanel from "../../utilities/featuresPanel/Index";
import DashBoardDefaultLayout from "../../views/dashboardDefaultView/Index";
import "./style.scss";
import {Col, Container, Row} from "react-bootstrap";
const Index = () => {
    return (
        <div className="defaultlayout">
            <Header />
            <Routes>
                <Route index element={<DashBoardDefaultLayout />} />
                {routes.map((item, index) => (
                    <Route key={index + 1} path={item.path} element={item.element} />
                ))}
                <Route path="*" element={<>err in def layout</>} />
            </Routes>

            {/* <Link to="page1">
                <button>go to page1</button>
            </Link>
            <Link to="page2">
                <button>go to page2</button>
            </Link>
            <Link to="page3">
                <button>go to page3</button>
            </Link> */}
        </div>
    );
};

export default Index;
