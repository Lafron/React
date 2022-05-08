import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, col) => {
        if (columns[col].component) {
            const component = columns[col].component;

            if (typeof component === "function") {
                return component(item);
            }
            return component;
        } else {
            const path = columns[col].path;
            return _.get(item, path);
        }
    };

    const userId = user => {
        return (
            "/users/" + user._id.toString()
        );
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((col) => (
                        <td key={col}>
                            {
                                (columns[col].path && columns[col].path === "name")
                                    ? <a href={userId(item)}>
                                        {renderContent(item, col)}
                                    </a>
                                    : renderContent(item, col)
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
