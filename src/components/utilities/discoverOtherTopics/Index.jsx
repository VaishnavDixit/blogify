import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth";
import {logout} from "../../../store/authSlice";
import "./style.scss";
import {Button} from "react-bootstrap";

const DiscoverOtherTopics = () => {
    return (
        <div className="discoverOthersStyle py-2">
            <h5 className="josefin-sans-bold text-center mb-3">Discover new topics</h5>
            <div className="blog p-2 mb-4 ">
                <h4 className="title josefin-sans-bolder mb-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque earum sunt
                    officiis reprehenderit similique rem fugiat laboriosam, nostrum, nobis, odio
                    dolor? Iste ipsum repudiandae sit recusandae saepe. Aliquid, beatae! Dolores!
                </h4>
                <div className="d-flex publisher justify-content-start align-items-center">
                    <img className="rounded-circle" src="https://picsum.photos/200/300" />
                    <p className="mb-0 ms-2 name text-truncate">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur veritatis
                        aspernatur voluptas eum quidem porro, nulla sint vitae cupiditate voluptates
                        dolore autem, rem ea magnam, culpa libero? Ipsa, debitis aspernatur!
                    </p>
                </div>
            </div>
            <div className="blog p-2 mb-4 ">
                <h4 className="title josefin-sans-bolder mb-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque earum sunt
                    officiis reprehenderit similique rem fugiat laboriosam, nostrum, nobis, odio
                    dolor? Iste ipsum repudiandae sit recusandae saepe. Aliquid, beatae! Dolores!
                </h4>
                <div className="d-flex publisher justify-content-start align-items-center">
                    <img className="rounded-circle" src="https://picsum.photos/200/300" />
                    <p className="mb-0 ms-2 name text-truncate">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur veritatis
                        aspernatur voluptas eum quidem porro, nulla sint vitae cupiditate voluptates
                        dolore autem, rem ea magnam, culpa libero? Ipsa, debitis aspernatur!
                    </p>
                </div>
            </div>
            <div className="blog p-2 mb-4 ">
                <h4 className="title josefin-sans-bolder mb-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque earum sunt
                    officiis reprehenderit similique rem fugiat laboriosam, nostrum, nobis, odio
                    dolor? Iste ipsum repudiandae sit recusandae saepe. Aliquid, beatae! Dolores!
                </h4>
                <div className="d-flex publisher justify-content-start align-items-center">
                    <img className="rounded-circle" src="https://picsum.photos/200/300" />
                    <p className="mb-0 ms-2 name text-truncate">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur veritatis
                        aspernatur voluptas eum quidem porro, nulla sint vitae cupiditate voluptates
                        dolore autem, rem ea magnam, culpa libero? Ipsa, debitis aspernatur!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DiscoverOtherTopics;
