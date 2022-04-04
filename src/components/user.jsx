import React from "react";
import setQualities from "./quality";
import setBookmarks from "./bookmark";

const User = (users, uDelete, bmToggle) => {
    
    return users.map(user=><tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.qualities.map(qual=>setQualities(qual))}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>{<span onClick={()=>bmToggle(user._id)}>
                {setBookmarks(user.bookmark)}</span>}</td>
            <td>
                <button className="btn bg-danger" 
                    onClick={()=>uDelete(user._id)}
                >
                    Delete
              </button></td>
    </tr>)
};

export default User;