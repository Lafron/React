import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";
import api from "../../api";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });
    let [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);

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
            <div className="mb-4">
                <label htmlFor="validationCustom04" className="form-label">
                    State
                </label>
                <select
                    className="form-select"
                    id="validationCustom04"
                    name="profession"
                    defaultValue={data.profession}
                    onChange={handleChange}
                >
                    <option disabled value="">
                        Choose...
                    </option>
                    {professions &&
                        Object.keys(professions).map((prof) => (
                            <option
                                key={professions[prof]._id}
                                value={professions[prof]._id}
                            >
                                {professions[prof].name}
                            </option>
                        ))}
                </select>
                <div className="invalid-feedback">
                    Please select a valid state.
                </div>
            </div>
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
export default RegisterForm;
