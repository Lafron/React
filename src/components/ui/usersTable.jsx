import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import QualitiesObj from "./qualites";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({ users, uDelete, bmToggle, onSort, selectedSort }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            sort: { sorted: false, up: true },
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "качество",
            component: (user) => <QualitiesObj.QualitiesList qualities={user.qualities} />
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
            path: "bookmark",
            name: "избранное",
            sort: { sorted: false, up: true },
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
