const Search = (searchText, users) => {
    const searchUsers = searchText
        ? users.filter((user) =>
            user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        : users;

    return { searchUsers };
};

export default Search;
