import React, { useState } from "react";
import PropTypes from "prop-types";
import Sort from "./sort";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [updColumns, setColumns] = useState(columns);

    const handleSort = (item) => {
        Object.values(updColumns).map((col) => {
            if (!col.component) {
                col.sort.sorted = false;
            }
            return col;
        });
        item.sort.sorted = true;
        setColumns(updColumns);

        if (selectedSort.path === item.path) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
            item.sort.up = !item.sort.up;
        } else {
            onSort({ path: item.path, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(updColumns).map((col) => {
                    return (
                        <th
                            key={col}
                            onClick={() =>
                                updColumns[col].path
                                    ? handleSort(updColumns[col])
                                    : undefined
                            }
                            {...{ role: updColumns[col].path && "button" }}
                            scope="col"
                        >
                            {updColumns[col].name}
                            {updColumns[col].sort && updColumns[col].sort.sorted
                                ? Sort(updColumns[col])
                                : ""}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
