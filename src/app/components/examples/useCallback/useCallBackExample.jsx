import React, { useEffect, useRef, useState, useCallback } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

const UseCallBackExample = () => {
    const [data, setData] = useState({});
    const withOutCallBack = useRef(0);
    const withCallBack = useRef(0);

    const handleChange = ({ target }) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    // Without Callback
    const validateWithOutCallBack = data => {
        console.log(data);
    };

    useEffect(() => {
        withOutCallBack.current++;
    }, [validateWithOutCallBack]);

    // Without Callback
    const validateWithCallBack = useCallback(data => {
        console.log(data);
    }, []);

    useEffect(() => {
        withCallBack.current++;
    }, [validateWithCallBack]);

        useEffect(() => {
        validateWithOutCallBack(data);
        validateWithCallBack(data);
    }, [data]);

    return (
        <CardWrapper>
            <SmallTitle>Example</SmallTitle>
            <p> Render withOutCallBack: {withOutCallBack.current}</p>
            <p> Render withCallBack: {withCallBack.current}</p>

            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input type={"email"}
            className="form-control"
            value={data.email || ""}
            name="email"
            id="email"
            onChange={handleChange}
            />
        </CardWrapper>
    );
};

export default UseCallBackExample;
