import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ContentModal from "./ContentModal";

// TODO: This is all still sample data, this needs to turned into a legit dashboard
const Home = () => {
    const { user, loading, getUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user == null)
            hydrate().then(res => 'promise handled');
    }, []);

    async function hydrate() {
        await getUser()
    }

    return (
        <div>
            <h3>Welcome { !loading ? <span>{user.firstName} {user.lastName}!</span> : null }</h3>
            <div>
                <h3>Your Action Items: </h3>
                { !loading ?
                    user.actionItems.map((item, i) => <span key={i}>{item.subject}</span>)
                    : null}
            </div>
            <button onClick={() => setShowModal(true)}>change modal state</button>
            <ContentModal show={showModal} setShow={setShowModal}>
                <div>Modal Child Elements Placeholder</div>
            </ContentModal>
        </div>
    );
};

export default Home;
