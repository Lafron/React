import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    let [errors, setErrors] = useState({});

    const validatorConfig = {
        email: {
            isRequared: { message: "E-mail is requared" },
            isEmail: { message: "E-mail isn't correct!" }
        },
        password: {
            isRequared: { message: "Password is requared" },
            isCapitalSym: { message: "Password must have capital letters" },
            isContainDigit: { message: "Password must have digits" },
            min: { message: "Password must have 8 symbols", value: 8 }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (isValid) return false;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="email"
                            name="email"
                            value={data.email}
                            errors={errors.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="password"
                            type="password"
                            name="password"
                            value={data.password}
                            errors={errors.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
