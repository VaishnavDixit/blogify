import Skeleton from "react-loading-skeleton";

export const ViewBlogLoader = () => (
    <>
        <Skeleton
            style={{
                width: "80%",
                height: "10px",
            }}
        />
        <Skeleton
            style={{
                width: "80%",
                height: "10px",
            }}
        />
        <Skeleton
            style={{
                display: "block",
                margin: "8px auto",
                width: "70%",
                height: "250px",
            }}
        />
        <div className="d-flex justify-content-start">
            <Skeleton
                style={{
                    width: "110px",
                    height: "30px",
                    borderRadius: "15px",
                    marginRight: "6px",
                }}
            />
            <Skeleton
                style={{
                    width: "70px",
                    height: "30px",
                    borderRadius: "15px",
                    marginRight: "6px",
                }}
            />
            <Skeleton
                style={{
                    width: "80px",
                    height: "30px",
                    borderRadius: "15px",
                    marginRight: "6px",
                }}
            />
            <Skeleton
                style={{
                    width: "60px",
                    height: "30px",
                    borderRadius: "15px",
                    marginRight: "6px",
                }}
            />
        </div>
        <Skeleton
            style={{
                width: "60%",
                height: "10px",
            }}
        />
        <Skeleton
            style={{
                width: "50%",
                height: "10px",
            }}
        />
        <Skeleton
            style={{
                width: "60%",
                height: "10px",
            }}
        />

        <Skeleton
            style={{
                width: "45%",
                height: "10px",
            }}
        />
        <Skeleton
            style={{
                width: "55%",
                height: "10px",
            }}
        />
        <Skeleton
            style={{
                width: "65%",
                height: "10px",
            }}
        />
    </>
);
export const RecommendedTopicsLoader = () => (
    <>
        <Skeleton style={{margin: "8px", width: "110px", height: "30px", borderRadius: "15px"}} />
        <Skeleton style={{margin: "8px", width: "70px", height: "30px", borderRadius: "15px"}} />
        <Skeleton style={{margin: "8px", width: "80px", height: "30px", borderRadius: "15px"}} />
        <Skeleton style={{margin: "8px", width: "60px", height: "30px", borderRadius: "15px"}} />
    </>
);

export const TrendingPageLoader = () => (
    <>
        <Skeleton style={{width: "100%", height: "10px", borderRadius: "15px"}} />
        <Skeleton style={{width: "70%", height: "10px", borderRadius: "15px"}} />
        <Skeleton
            circle
            width={30}
            height={30}
            style={{
                margin: "8px 0px",
            }}
        />
        <Skeleton style={{width: "100%", height: "10px", borderRadius: "15px"}} />
        <Skeleton style={{width: "70%", height: "10px", borderRadius: "15px"}} />
        <Skeleton
            circle
            width={30}
            height={30}
            style={{
                margin: "8px 0px",
            }}
        />
    </>
);

export const BlogsListLoader = () => (
    <div className="d-flex mb-4">
        <div style={{width: "60%"}}>
            <Skeleton style={{height: "8px"}} />
            <Skeleton style={{height: "8px"}} />
            <Skeleton style={{height: "8px"}} />
            <Skeleton style={{height: "8px"}} />
            <div className="d-flex align-items-center">
                <Skeleton circle width={30} height={30} />
                <Skeleton style={{width: "50px", height: "10px", marginLeft: "6px"}} />
            </div>
        </div>
        <div style={{width: "30%", padding: "0px 0px 0px 5%"}}>
            <Skeleton style={{height: "126px"}} />
        </div>
    </div>
);
