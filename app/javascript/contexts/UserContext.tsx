import React, { createContext, useState, useEffect } from "react";

type User = {
    firstName: string;
    lastName: string;
    role: string;
    actionItems: Array<{
        subject: string;
        detail: {};
    }>
}

interface UserContext {
    loading: boolean;
    user: User;
    updateUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
}

// define an outline of the user context, implementation details are in UserProvider
export const UserContext = createContext<UserContext>({
    loading: false,
    user: undefined,
    updateUser: (user: User) => {},
    setLoading: (loading: boolean) => {}
});

// Implement UserContext and return a Provider that houses child components
export const UserProvider = ({ children }) => {
    // retrieve our UserContext dependencies when UserProvider is instantiated
    useEffect(() => {
        getUser().then(res => setLoading(false));
    }, []);

    async function getUser() {
        setLoading(true);
        // get the current user's id
        let result = await fetch('/user/current');
        let data = await result.json();
        // now get he data associated with that user
        result = await fetch(`/users/${data['user_id']}`);
        data = await result.json();
        // cast the returned data over to the UserContext naming conventions
        // and update our UserContext with the retrieved user
        updateUser({
            firstName: data['first_name'],
            lastName: data['last_name'],
            role: data['role'],
            actionItems: data['action_items']
        });
    }

    // replace the user object with a new user object
    const updateUser = (user: User) => {
        setUser(prevState => {
            return {
                ...prevState,
                user
            };
        });
    };

    // update the loading status
    const setLoading = (loading: boolean) => {
        setUser(prevState => {
            return {
                ...prevState,
                loading
            };
        });
    };

    // set the default state of UserContext
    const userState = {
        loading: false,
        user: {
            firstName: '',
            lastName: '',
            role: '',
            actionItems: [{
                subject: '',
                detail: {}
            }]
        },
        updateUser,
        setLoading
    };

    const [user, setUser] = useState<UserContext>(userState);
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}