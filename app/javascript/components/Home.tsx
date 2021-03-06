import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
    const { user, loading } = useContext(UserContext);

    return (
        <div>
            <h3>Welcome { !loading ? <span>{user.firstName} {user.lastName}!</span> : null }</h3>
            <div>
                <h3>Your Action Items: </h3>
                { !loading ?
                    user.actionItems.map((item, i) => <span key={i}>{item.subject}</span>)
                    : null}
            </div>
        </div>
    );
};

export default Home;
