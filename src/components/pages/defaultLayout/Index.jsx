import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import routes from "../../../../routes";
import Header from "../../utilities/header/Index";
import "./style.scss";
const Index = () => {
    return (
        <div className="defaultlayout">
            <Header />
            <Link to="page1">
                <button>go to page1</button>
            </Link>
            <Link to="page2">
                <button>go to page2</button>
            </Link>
            <Link to="page3">
                <button>go to page3</button>
            </Link>
            <Routes>
                <Route index element={<>def layout default</>} />
                {routes.map((item) => (
                    <Route path={item.path} element={item.element} />
                ))}
                <Route path="*" element={<>err in def layout</>} />
            </Routes>
        </div>
    );
};

export default Index;
