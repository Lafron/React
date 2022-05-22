import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import Select from "react-select";

const Edit = () => {
    const params = useParams();
    const { userId } = params;

    const [users, setUsers] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);

    const history = useHistory();

    const qualitiesColorArr = qualities &&
        Object.keys(qualities).map(qual =>
            ({ id: qualities[qual]._id, color: qualities[qual].color }));

    const user = users && users.find(user => user._id === userId);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users.update(userId, user);
        history.push("/users/" + userId);
    };

    const getInputClasses = () => {
        return "form-control ";// + (errors ? "is-invalid" : "");
    };

    const sexOptions = [{ name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];

    const handleChange = ({ target }) => {
        const value = (target.name === "profession")
            ? (professions.find(prof => prof.name === target.value))
            : target.value;
        user[target.name] = value;
    };

    const handleProfChange = prof => {
        const newUserProf = { _id: prof.value, name: prof.label };
        user.profession = newUserProf;
    };

    const handleQualitiesChange = userQualities => {
        const formatedQualities = userQualities.map(uQual => {
            const colorObj = qualitiesColorArr.find(qual =>
                qual.id === uQual.value);
            return ({ _id: uQual.value, name: uQual.label, color: colorObj.color });
        });

        user.qualities = formatedQualities;
    };

    const userQualities = user && user.qualities.map(qual =>
        ({ label: qual.name, value: qual._id }));

    const qualityArray = qualities &&
        (Object.keys(qualities).map(qual =>
            ({ label: qualities[qual].name, value: qualities[qual]._id })));

    const defaultProf = user && {
        label: user.profession.name,
        value: user.profession._id
    };

    const profArray = professions && professions.map(prof =>
        ({ label: prof.name, value: prof._id }));

    return (
        <form onSubmit={handleSubmit} className="w-50 container justify-content-md-center">
            { user
                ? (
                    <div className="">
                        <label
                            htmlFor="nameField"
                            className=""
                        >
                        Name
                        </label>
                        <div className="input-group has-validation">
                            <input
                                type="text"
                                id="nameField"
                                name="name"
                                defaultValue={user.name}
                                className={getInputClasses()}
                                onChange={handleChange}
                            />
                        </div>
                        <label
                            htmlFor="emailField"
                            className="mt-4"
                        >
                        Email
                        </label>
                        <div className="input-group has-validation mb-4">
                            <input
                                type="text"
                                id="emailField"
                                name="email"
                                defaultValue={user.email}
                                className={getInputClasses()}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profField" className="form-label">
                            Profession
                            </label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={defaultProf}
                                options={profArray}
                                onChange={handleProfChange}
                                name="profession"
                            />
                        </div>
                        <div className="mb-4">
                            <div>
                                <label className="form-label">
                                Sex
                                </label>
                            </div>
                            {
                                sexOptions.map(opt => (
                                    <div key={opt.name}
                                        className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="sex"
                                            id={opt.name + "_" + opt.value}
                                            defaultValue={opt.value}
                                            checked={opt.value === user.sex}
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={opt.name + "_" + opt.value}
                                        >
                                            {opt.name}
                                        </label>
                                    </div>)
                                )}
                        </div>
                        <div className="mb-4">
                            <label className="form-label">
                            Qualities
                            </label>
                            <Select
                                isMulti
                                defaultValue={userQualities}
                                closeMenuOnSelect={false}
                                options={qualityArray}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleQualitiesChange}
                                name="qualities"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                    Submit
                        </button>
                    </div>
                )
                : <h1>Loading...</h1>
            }
        </form>);
};

export default Edit;
