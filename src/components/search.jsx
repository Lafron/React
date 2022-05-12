// import React from "react";
// import { useState } from "react";
import api from "../api";

const Search = searchText => {
    const users = api.users.default.fetchAllWithoutDelay();

    const searchUsers = searchText
        ? users.filter(user => user.name.indexOf(searchText) > -1)
        : users;

    return ({ searchUsers });
};

export default Search;
