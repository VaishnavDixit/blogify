import React from "react";

const ShowData = ({data}) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ShowData;
