import React from "react";
import UserDetails from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <div> {userId ? <UserDetails /> : <UsersListPage />}</div>;
};

export default Users;
