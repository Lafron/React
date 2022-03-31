import React,{useState} from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const setQualities = quality => {
        let classes = "badge m-1 bg-";
        classes += quality.color;
        
        return (
        <span key = {quality._id}
                className={classes}>
                {quality.name}
        </span>
      )
    };

    const renderPhrase = number => {
        if(number > 0){
            return(
                <span className="text-light bg-primary p-2">
                    {number} человек сегодня тусанут с табой
                </span>
            )
        }
        else{
            return(
                <span className="text-light bg-danger p-2">
                     Никто с табой не тусанёт
                </span>
            );
        }        
    };

    const handleDelete = userId => {
        setUsers(users => users.filter(user => user._id !== userId));
    };


    const renderUsers = () => {
        return users.map(user=><tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.qualities.map(qual=>setQualities(qual))}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <button className="btn bg-danger" 
                    onClick={()=>handleDelete(user._id)}
                >
                    Delete
              </button></td>
        </tr>)
    };

    if(users.length > 0) {
        return <>
            <h3>{renderPhrase(users.length)}</h3>      
            <table>
                <thead>
                    <tr>
                        <th scope="col">имя</th>
                        <th scope="col">качество</th>
                        <th scope="col">профессия</th>
                        <th scope="col">встретился раз</th>
                        <th scope="col">оценка</th>
                    </tr>
                </thead>        
                <tbody>{renderUsers()}</tbody>
            </table>
        </>
    }
    else {
        return(
            <h3>{renderPhrase(0)}</h3>
        );
    }
};

export default Users;