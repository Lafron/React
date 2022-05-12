import React from "react";
import UsersList from "../components/usersList";
import UserDetails from "../components/userDetails";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <div> {userId ? <UserDetails /> : <UsersList />}</div>;
};

export default Users;
