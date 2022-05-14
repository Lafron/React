import api from "../api";

const Search = (searchText) => {
    const users = api.users.default.fetchAllWithoutDelay();

    const searchUsers = searchText
        ? users.filter((user) =>
            user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        : users;

    return { searchUsers };
};

export default Search;
