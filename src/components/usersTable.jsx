import React from "react";
import PropTypes from "prop-types";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({ users, uDelete, bmToggle, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя", sort: { sorted: false, up: true } },
        qualities: {
            name: "качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            path: "profession.name",
            name: "профессия",
            sort: { sorted: false, up: true }
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "встретился раз",
            sort: { sorted: false, up: true }
        },
        rate: {
            path: "rate",
            name: "оценка",
            sort: { sorted: false, up: true }
        },
        bookmark: {
            // path: "bookmark",
            name: "избранное",
            component: (user) => {
                return (
                    <span onClick={() => bmToggle(user._id)}>
                        {Bookmark(user.bookmark)}
                    </span>
                );
            }
        },
        delete: {
            component: (user) => (
                <button
                    className="btn bg-danger"
                    onClick={() => uDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
        // >
        //     <TableHeader {...{ onSort, selectedSort, columns }} />
        //     <TableBody {...{ columns, data: users }}/>
        // </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    uDelete: PropTypes.func.isRequired,
    bmToggle: PropTypes.func.isRequired
};

export default UserTable;
