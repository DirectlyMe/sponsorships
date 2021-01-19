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
    sponsees?: Array<User>;
    sponsors?: Array<User>;
    handlers?: Array<User>;
    actionItems: Array<{
        subject: string;
        detail: {};
    }>;
    profileImage: string;
}

const Layout = styled.div`
    margin-top: 100px;
`;

const Clients = () => {
    const { user, loading } = useContext(UserContext);
    const [ sponsees, setSponsees ] = useState<Array<User>>([]);

    useEffect(() => {
        hydrate().then(res => 'Client Screen Hydrated');
    }, [loading]);

    async function hydrate() {
        if (loading) return;
        const response = await fetch(`/api/handler_relations/handler/${user.userId}?include_sponsors=true`);
        const data = await response.json();
        console.log(data);
        setSponsees(data['sponsees'].map(sponsee => {
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
                sponsors: sponsee['sponsors'].map(sponsor => {
                    return {
                        userId: sponsee['user_id'],
                        firstName: sponsee['first_name'],
                        lastName: sponsee['last_name'],
                        email: sponsee['email'],
                        role: sponsee['role'],
                        description: sponsee['description'],
                        employeeId: sponsee['employee_id'],
                        phone: sponsee['phone'],
                    };
                })
            };
        }));
    }

    return (
        <Layout>
            { loading ? <div>loading</div> : sponsees.map(sponsee => <div>{sponsee.firstName}</div>)}
        </Layout>
    )
};

export default Clients;