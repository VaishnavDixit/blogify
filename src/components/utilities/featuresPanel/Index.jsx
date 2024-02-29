import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../../../appwrite/auth";
import {logout} from "../../../store/authSlice";
import "./style.scss";
import { Button } from "react-bootstrap";
import service from "../../../appwrite/config";

const FeaturesPanel = () => {
	const [data, setData] = useState([]);
	useEffect(()=>{
		(async ()=>{
			const res = await service.getTags();
			console.log(res);
			setData(res.documents)
		})();
	},[])
    return (
        <div className="featuresPanelStyle py-4 border-bottom">
			<h5 className="josefin-sans-bold text-center mb-3">Recommended Topics</h5>
			{
				data?.map(tag=>(
					<Button className="me-2 my-1 py-1 rounded-pill ">{tag.name}</Button>
				))
			}
        </div>
    );
};

export default FeaturesPanel;
