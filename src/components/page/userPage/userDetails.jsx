import React, { useState, useEffect } from "react";
import api from "../../../api";
import QualitiesObj from "../../ui/qualites";
import { useHistory, useParams } from "react-router-dom";

const UserDetails = () => {
    const params = useParams();
    const { userId } = params;

    const [selectedUser, setSelUsers] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setSelUsers(data);
        });
    }, []);

    const renderQualities = (user) => {
        return user.qualities.map((qual) => {
            return (
                <div key={qual.name} className="row">
                    <div className="col">{QualitiesObj.setQualities(qual)}</div>
                </div>
            );
        });
    };

    const history = useHistory();

    const handleAllUsers = () => {
        history.push("/users/" + userId + "/edit");
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

    const renderParams = (user) => {
        return (
            <>
                <div>
                    <div key={user.name}>
                        <h1>{user.name}</h1>
                    </div>
                    <div className="clearfix">
                        <div className="row float-sm-start">
                            <div className="col">
                                <h2>Profession: </h2>
                            </div>
                            <div className="col">
                                <h2>{user.profession.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div>{renderQualities(user)}</div>
                <div>completedMeetings: {user.completedMeetings}</div>
                <div className="clearfix mt-2">
                    <div className="row float-sm-start">
                        <div className="col">
                            <h3>Rate:</h3>
                        </div>
                        <div className="col">
                            <h3>{user.rate}</h3>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <button onClick={handleAllUsers}>Edit</button>
                </div>
            </>
        );
    };

    return selectedUser ? renderParams(selectedUser) : loading();
};

export default UserDetails;
