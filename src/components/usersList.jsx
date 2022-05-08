import React, { useState, useEffect } from "react";
import api from "../api";
import RenderPhrase from "./searchStatus";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";
import UserTable from "./usersTable";
import _ from "lodash";

const UsersList = () => {
    let [users, setUsers] = useState();

    useEffect(() => {
        api.users.default.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const [professions, setProfession] = useState();

    const pageSize = 4;
    let [currentPage, setCurrentPage] = useState(1);
    let [currentPageUsersNum, setUsersNumber] = useState(pageSize);

    const [selectedProf, setSelectedProf] = useState();

    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession.name === selectedProf)
        : users;

    const count = filteredUsers ? filteredUsers.length : 0;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const handleDelete = (userId) => {
        if (filteredUsers.length > 0) {
            users = users.filter((user) => user._id !== userId);
            setUsers(users);
            setUsersNumber(--currentPageUsersNum);

            if (filteredUsers.length === 1 && selectedProf) {
                clearFilter();
                setUsers(users);
            } else {
                if (currentPageUsersNum < 1) {
                    setUsersNumber(pageSize);
                    setCurrentPage(
                        currentPage > 1 ? --currentPage : currentPage
                    );
                }
            }
        }
    };

    const handleBookmarkToggle = (id) => {
        const updateUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(updateUsers);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item.name);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const renderUsers = () => {
        return (
            <div>
                <div className="d-flex">
                    {count > 0 && professions && (
                        <div className="p-3">
                            <GroupList
                                items={professions}
                                selectedItem={selectedProf}
                                onItemSelect={handleProfessionSelect}
                            />
                            <div>
                                <button
                                    className="btn btn-secondary mt-2 ps-5 pe-5"
                                    onClick={clearFilter}
                                >
                                    Отчистить
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="d-flex flex-column mt-3">
                        <h3>{RenderPhrase(count, users)}</h3>
                        {count > 0 && (
                            <UserTable
                                users={userCrop}
                                uDelete={handleDelete}
                                bmToggle={handleBookmarkToggle}
                                onSort={handleSort}
                                selectedSort={sortBy}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return <div>{renderUsers()}</div>;
};

export default UsersList;
