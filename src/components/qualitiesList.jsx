import React from "react";
import PropTypes from "prop-types";
import setQualities from "./quality";

const QualitiesList = ({ qualities }) => {
    return <>{qualities.map((qual) => setQualities(qual))}</>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
