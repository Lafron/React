import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    let [errors, setErrors] = useState({});

    // const validateSchema = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Password is required")
    //         .matches(/^(?=.*[A-Z])/, "Password must contain at least one capital letters")
    //         .matches(/(?=.*[0-9])/, "Password must contain at least one digit")
    //         .matches(/(?=.*[!@#$%^&*])/, "Password must contain one of the special characters: !@#$%^&*")
    //         .matches(/(?=.{8,})/, "Password must be at least 8 characters long"),

    //     email: yup
    //         .string()
    //         .required("E-mail is required")
    //         .email("E-mail isn't correct!")

    // });

    const validatorConfig = {
        email: {
            isRequired: { message: "E-mail is required" },
            isEmail: { message: "E-mail isn't correct!" }
        },
        password: {
            isRequired: { message: "Password is required" },
            isCapitalSym: { message: "Password must contain at least one capital letters" },
            isContainDigit: { message: "Password must contain at least one digit" },
            min: { message: "Password must be at least 8 characters long", value: 8 }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        errors = validator(data, validatorConfig);
        setErrors(errors);

        // validateSchema
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch(err => setErrors({ [err.path]: err.message }));

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
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
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn">
                    Remain in the system
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};
export default LoginForm;
