import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import "./style.scss";
import {useGetPosts} from "../../../queries/blogs";
import {useNavigate} from "react-router";
import Skeleton from "react-loading-skeleton";
import {TrendingPageLoader} from "../loadingScreens/Index";
import {useQueryClient} from "@tanstack/react-query";
const DiscoverOtherTopics = () => {
    const queryClient = useQueryClient();
    const {data: posts, isLoading} = useGetPosts();
    const [trending, setTrending] = useState([]);
    const navigate = useNavigate();

    const handleOnClickPost = (id) => {
        queryClient.invalidateQueries("getPosts");
        queryClient.invalidateQueries("getTags");
        navigate(`/view/${id}`);
    };

    useEffect(() => {
        if (posts) {
            let list = posts?.documents?.sort((a, b) => b.likedBy.length - a.likedBy.length);
            console.log(list);
            if (list && list?.length >= 3) {
                list = [list[0], list[1], list[2]];
            } else if (posts && posts?.length >= 2) {
                list = [list[0], list[1]];
            }
            setTrending(list);
        }
    }, [posts]);

    return (
        <div className="discoverOthersStyle py-2">
            <h4 className="font1-regular text-center mb-3">Trending 🔥</h4>
            {isLoading ? (
                <TrendingPageLoader />
            ) : (
                trending &&
                trending.map(({title, publisher, $id}, index) => (
                    <div className="blog p-2 mb-4" key={index+1} onClick={() => handleOnClickPost($id)}>
                        <h4 className="title font1-bolder line-wrap3 mb-2">{title}</h4>
                        <div className="d-flex publisher line-wrap3 justify-content-start align-items-center">
                            <img className="rounded-circle" src="https://picsum.photos/200/300" />
                            <p className="mb-0 ms-2 name text-truncate">
                                {publisher && publisher.name}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DiscoverOtherTopics;
