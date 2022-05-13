import React, { useState, useEffect } from "react";
import api from "../../../api";
import RenderPhrase from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Search from "../../../components/search";

const UsersListPage = () => {
    let [users, setUsers] = useState();
    const searchBox = document.querySelector("#searchBox");
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        api.users.default.fetchAll().then((data) => {
            setUsers(data);
            setAllUsers(data);
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
        searchBox.value = "";
        setUsers(allUsers);

        setSelectedProf(item.name);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = () => {
        clearFilter();

        const searchUsersObj = Search(searchBox.value);
        setUsers(searchUsersObj.searchUsers);
    };

    const renderUsers = () => {
        const searchText = searchBox ? searchBox.value : "";
        return (
            <div>
                <div className="d-flex">
                    {(searchText || count > 0) && professions && (
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
                    <div className="d-flex flex-column w-100 m-3">
                        <h3>{RenderPhrase(count, users, searchText)}</h3>

                        {(searchText || count > 0) && (
                            <div className="w-100">
                                <input
                                    id="searchBox"
                                    type="text"
                                    // defaultValue={"Search"}
                                    className="w-100 mt-2"
                                    onFocus={() => {
                                        document.querySelector("#searchBox").value = "";
                                    }}
                                    onBlur={handleSearch}
                                    onChange={handleSearch}
                                />{(searchText && count < 1)
                                    ? ("Нет совпадений...")
                                    : (
                                        <UserTable
                                            users={userCrop}
                                            uDelete={handleDelete}
                                            bmToggle={handleBookmarkToggle}
                                            onSort={handleSort}
                                            selectedSort={sortBy}
                                        />
                                    )
                                }
                            </div>
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

export default UsersListPage;
