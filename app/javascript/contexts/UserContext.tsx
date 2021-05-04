// only use for user specific data
import React, { createContext, useState, useEffect } from "react";
import { User } from "UserTypes";

interface UserContext {
    loading: boolean;
    authenticated: boolean;
    user: User;
    getUser: () => void;
    updateUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    setAuth: (authenticated: boolean) => void;
}

// define an outline of the user context, implementation details are in UserProvider
export const UserContext = createContext<UserContext>({
    loading: false,
    authenticated: false,
    user: undefined,
    getUser: () => {},
    updateUser: (user: User) => {},
    setLoading: (loading: boolean) => {},
    setAuth: (authenticated: boolean) => {}
});

// Implement UserContext and return a Provider that houses child components
export const UserProvider = ({ children }) => {
    // retrieve our UserContext dependencies when UserProvider is instantiated
    useEffect(() => {
        getUser().then(res => console.log('user loaded'));
    }, []);

    const getUser = async () => {
        setLoading(true);

        // get the current user's id
        const userId = await getUserId();
        if (userId === -1) {
            setLoading(false);
            logoutUser();
            throw 'Cannot get user id, please reauthenticate.'
        }
        setAuth(true);

        // now get the data associated with that user
        const result = await fetch(`/users/${userId}`);
        const data = await result.json();
        // cast the returned data over to the UserContext naming conventions
        // and update our UserContext with the retrieved user
        updateUser({
            userId: data['user_id'],
            firstName: data['first_name'],
            lastName: data['last_name'],
            email: data['email'],
            role: data['role'],
            description: data['description'],
            employeeId: data['employee_id'],
            phone: data['phone'],
            actionItems: data['action_items'],
            profileImage: data['profile_image']
        });
        setLoading(false);
    }

    const getUserId = async () => {
        const result = await fetch('/users/current');
        const data = await result.json();
        return data['user_id'];
    }

    const logoutUser = () => {
        setAuth(false);
        if (window.location.pathname != '/auth/logout' && window.location.pathname != '/auth/login') {
            window.location.pathname = '/auth/logout';
            window.location.pathname = '/auth/login';
        }
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

    const setAuth = (authenticated: boolean) => {
        setUser(prevState => {
            return {
                ...prevState,
                authenticated
            };
        });
    };

    // set the default state of UserContext
    const userState = {
        loading: false,
        authenticated: false,
        user: {
            userId: -1,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            description: '',
            phone: '',
            employeeId: '',
            actionItems: [{
                subject: '',
                detail: {}
            }],
            profileImage: ''
        },
        getUser,
        updateUser,
        setLoading,
        setAuth
    };

    const [user, setUser] = useState<UserContext>(userState);
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}