import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = (props) => {
    const result = props.isAuth
        ? <button onClick={props.onLogOut}>Logout</button>
        : <button onClick={props.onLogIn}>Login</button>;
    return (<p>{result}</p>);
};

SimpleComponent.propTypes = {
    isAuth: PropTypes.bool,
    onLogOut: PropTypes.func,
    onLogIn: PropTypes.func
};

export default SimpleComponent;
