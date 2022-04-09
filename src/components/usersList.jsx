import React, { useState } from "react";
import api from "../api";
import User from "./user";
import RenderPhrase from "./searchStatus";
import Pagination from "./pagination";
import paginate from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const count = users.length;
    const pageSize = 4;
    let [currentPage, setCurrentPage] = useState(1);
    let [currentPageUsersNum, setUsersNumber] = useState(pageSize);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    const handleDelete = (userId) => {
        setUsersNumber(--currentPageUsersNum);
        setUsers((users) => users.filter(user => user._id !== userId));

        if (currentPageUsersNum < 1) {
            setUsersNumber(pageSize);
            setCurrentPage(currentPage > 1 ? --currentPage : currentPage);
        }
    };

    const handleBookmarkToggle = (id) => {
        const updateUsers = users.map(user => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(updateUsers);
    };

    const renderUsers = () => {
        if (count > 0) {
            return (
                <>
                    <table className="table table-responsiv m-0">
                        <thead>
                            <tr>
                                <th scope="col">имя</th>
                                <th scope="col">качество</th>
                                <th scope="col">профессия</th>
                                <th scope="col">встретился раз</th>
                                <th scope="col">оценка</th>
                                <th scope="col">избранное</th>
                            </tr>
                        </thead>
                        <tbody>
                            {User(userCrop, handleDelete, handleBookmarkToggle)}
                        </tbody>
                    </table>
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            );
        }
    };

    if (users.length > 0) {
        return (
            <div>
                <h3>{RenderPhrase(users.length)}</h3>
                {renderUsers()}
            </div>
        );
    } else {
        return <h3>{RenderPhrase(0)}</h3>;
    }
};

export default Users;
