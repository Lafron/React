import React, {useState} from "react";
import api from "../api";
import User from "./user";
import RenderPhrase from "./searchStatus";

const Users = () => {

    const [users, setUsers] = useState(api.users.fetchAll());
   
    const handleDelete = userId => {
        setUsers(users => users.filter(user => user._id !== userId));
    }; 

    const handleBookmarkToggle = id => {
        const updateUsers = users.map(user => {
            if(user._id === id){
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(updateUsers);
    }; 

    const renderUsers = () => {
        if(users.length>0){
            return (
            <>
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
                <tbody>{User(users, handleDelete, handleBookmarkToggle)}</tbody>
            </>)
        }
    };

    if(users.length > 0) {
        return <div>
            <h3 className="">{RenderPhrase(users.length)}</h3>      
            <table className="table table-responsiv m-0">
                {renderUsers()}
            </table>
        </div>
    }
    else {
        return(
            <h3>{RenderPhrase(0)}</h3>
        );
    }
};

export default Users;