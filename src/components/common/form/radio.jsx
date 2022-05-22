import React from "react";
import { PropTypes } from "prop-types";
const Radio = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    return (
        <div className="mb-4">
            <div>
                <label className="form-label">
                    {label}
                </label>
            </div>
            {
                options.map(opt => (
                    <div key={opt.name} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={opt.name + "_" + opt.value}
                            defaultValue={opt.value}
                            checked={opt.value === value}
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
    );
};

Radio.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default Radio;
