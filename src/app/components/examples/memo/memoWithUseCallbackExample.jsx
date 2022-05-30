import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const LogOutButton = ({ onLogOut }) => {
    useEffect(() => {
        console.log("render button");
    });

    return <>
        <button className="btn btn-primary" onClick={onLogOut}>
            Log Out
        </button>
    </>;
};

LogOutButton.propTypes = {
    onLogOut: PropTypes.func
};

const isEqual = (prevState, nextState) => {
    if (prevState.onLogOut !== nextState.onLogOut) {
        return false;
    } else {
        return true;
    }
};

const MemoizedLogOutButton =
    React.memo(LogOutButton, isEqual);

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false);

    const handleLogOut = useCallback(() => {
        localStorage.removeItem("auth");
    }, [props]);

    // const handleLogOut = () => {
    //     localStorage.removeItem("auth");
    // };

    return <>
        <button className="btn btn-primary"
            onClick={ () => setState(!state) }>
            initiate render
        </button>
        <LogOutButton onLogOut={handleLogOut} />;
        <MemoizedLogOutButton onLogOut={handleLogOut} />
    </>;
};

export default MemoWithUseCallbackExample;
