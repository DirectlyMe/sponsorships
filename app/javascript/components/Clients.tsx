import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import ContentModal from "./ContentModal";

type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    description: string;
    employeeId: string;
    role: string;
    creationStatus: string;
    sponsees?: Array<User>;
    sponsors?: Array<User>;
    handlers?: Array<User>;
    actionItems: Array<{
        subject: string;
        detail: {};
    }>;
    profileImage: string;
}

const ClientsLayout = styled.div`
    display: flex;
    flexDirection: row;
    margin-top: 75px;
    width: 100%;

`;

const ClientSection = styled.div`
    display: flex;
    flex-direction: column;
    border-right: solid 1px;
    width: 33%;
    max-width: 600px;
    margin-right: 20px;
    
     ul {
        list-style: none;
        height: 100px;
        padding: 0;
        columns: 2;
    }
`;

const ClientCards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 50fr 50fr;
    grid-template-rows: auto;
`;

const ClientCard = styled.div`
    height: 250px;
    border: solid 1px;
    border-radius: 10px;
    text-align: center;
    margin-right: 10px;
`;

const Clients = () => {
    const { user, loading } = useContext(UserContext);
    const [ sponsees, setSponsees ] = useState<Array<User>>([]);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ currentSponsee, setCurrentSponsee ] = useState<User>(null);

    useEffect(() => {
        hydrate().then(res => 'Client Screen Hydrated');
    }, [loading]);

    async function hydrate() {
        if (loading) return;
        const response = await fetch(`/api/handler_relations/handler/${user.userId}?include_sponsors=true`);
        const data = await response.json();
        setSponsees(data['sponsees'] == null ? [] : data['sponsees'].map(sponsee => {
            // cast to each sponsee to a User type, kind of annoying/sloppy, maybe refactor this
            return {
                userId: sponsee['user_id'],
                firstName: sponsee['first_name'],
                lastName: sponsee['last_name'],
                email: sponsee['email'],
                role: sponsee['role'],
                description: sponsee['description'],
                employeeId: sponsee['employee_id'],
                phone: sponsee['phone'],
                creationStatus: sponsee['creation_status'],
                sponsors: sponsee['sponsors'] == null ? [] : sponsee['sponsors'].map(sponsor => {
                    return {
                        userId: sponsor['user_id'],
                        firstName: sponsor['first_name'],
                        lastName: sponsor['last_name'],
                        email: sponsor['email'],
                        role: sponsor['role'],
                        description: sponsor['description'],
                        employeeId: sponsor['employee_id'],
                        phone: sponsor['phone'],
                    };
                })
            };
        }));
    }

    function sponseeSelected(sponsee: User) {
        setCurrentSponsee(sponsee);
        setShowModal(!showModal);
    }

    return (
        <>
            <ClientsLayout>
                <ClientSection>
                    <h2>Draft Profiles</h2>
                    <ClientCards>
                        { loading ? <div>loading</div> : sponsees.filter(sponsee => sponsee.creationStatus === 'draft').map((sponsee, index) => {
                            return <ClientCard key={index} onClick={() => sponseeSelected(sponsee) }>{sponsee.firstName}</ClientCard>
                        }) }
                    </ClientCards>
                </ClientSection>
                <ClientSection>
                    <h2>Awaiting Placement</h2>
                    <ClientCards>
                        { loading ? <div>loading</div> : sponsees.filter(sponsee => sponsee.sponsors.length <= 0 && sponsee.creationStatus !== 'draft').map((sponsee, index) => {
                            return <ClientCard key={index} onClick={() => sponseeSelected(sponsee) }>{sponsee.firstName}</ClientCard>
                        }) }
                    </ClientCards>
                </ClientSection>
                <ClientSection style={{ border: 'none' }}>
                    <h2>Placed</h2>
                    <ul>
                        { loading ? <div>loading</div> : sponsees.filter(sponsee => sponsee.sponsors.length > 0).map((sponsee, index) => {
                            return <ClientCard key={index} onClick={() => sponseeSelected(sponsee) }>{sponsee.firstName}</ClientCard>
                        }) }
                    </ul>
                </ClientSection>
            </ClientsLayout>
            {
                 currentSponsee == null ? null : (
                    <ContentModal show={showModal} setShow={setShowModal}>
                        <div>{currentSponsee.firstName}</div>
                    </ContentModal>
                )
            }
        </>
    )
};

export default Clients;