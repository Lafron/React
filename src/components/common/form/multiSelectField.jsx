import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray = (!Array.isArray(options) && (typeof options === "object")
        ? Object.keys(options).map(optionName =>
            ({ label: optionName, value: options[optionName]._id }))
        : options);

    const handleChange = (value) => {
        onChange({ name: value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <Select
                isMulti
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};

export default MultiSelectField;
