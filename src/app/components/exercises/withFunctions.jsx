import React from "react";
import CardWrapper from "../common/Card";

const withFunctions = Component => () => {
    const onLogin = () => {
        localStorage.setItem("auth", true);
    };
    const onLogout = () => {
        localStorage.removeItem("auth");
    };

    const isAuth = !!localStorage.getItem("auth");

    return (
        <CardWrapper>
            <Component isAuth = {isAuth} onLogIn={onLogin} onLogOut={onLogout} name = "new Name" />
        </CardWrapper>
    );
};

export default withFunctions;
