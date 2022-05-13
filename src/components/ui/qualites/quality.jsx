import React from "react";

const setQualities = (quality) => {
    let classes = "badge m-1 bg-";
    classes += quality.color;

    return (
        <span key={quality._id} className={classes}>
            <i className="bi bi-caret-down-fill"></i>
            {quality.name}
        </span>
    );
};

export default setQualities;
