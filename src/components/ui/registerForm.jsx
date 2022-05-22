import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import Radio from "../common/form/radio";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "",
        qualites: [],
        license: false
    });
    let [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualites, setQualites] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualites(data);
        });
    }, []);

    const validatorConfig = {
        email: {
            isRequired: { message: "E-mail is required" },
            isEmail: { message: "E-mail isn't correct!" }
        },
        password: {
            isRequired: { message: "Password is required" },
            isCapitalSym: { message: "Password must have capital letters" },
            isContainDigit: { message: "Password must have digits" },
            min: { message: "Password must have 8 symbols", value: 8 }
        },
        profession: {
            isRequired: {
                message: "Profession is required !"
            }
        },
        license: {
            isRequired: {
                message: "You may not use our service without confirm license"
            }
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
            <SelectField
                label="Chouse your profession"
                name="professions"
                options={professions}
                defaultOption="Choose..."
                value={data.profession}
                error={errors.profession}
                onChange={handleChange}
            />
            <Radio
                options={[{ name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="Sex"
                label={"Choose your sex"}
                onChange={handleChange}
            />
            <MultiSelectField
                defaultValue={data.qualities}
                options={qualites}
                onChange={handleChange}
                name="qualites"
                label="Choose your qualites" />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                error={errors.license}
                name="license">
                    Confirm license agreement
            </CheckBoxField>
            <div className="mb-4">
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
