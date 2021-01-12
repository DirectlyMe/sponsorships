// Use this file to pass around web application settings/state that needs to be global
import React, { createContext, useState, useEffect } from "react";

type AppSettings = {

};

interface GlobalAppContext {
    settingsLoading: boolean;
    settings: AppSettings;
    getSettings: () => void;
    updateSettings: (settings: AppSettings) => void;
    setSettingsLoading: (loading: boolean) => void;
}

// define an outline of the global context, implementation details are in GlobalAppProvider
export const GlobalAppContext = createContext<GlobalAppContext>({
    settingsLoading: false,
    settings: undefined,
    getSettings: () => {},
    updateSettings: (settings: AppSettings) => {},
    setSettingsLoading: (loading: boolean) => {},
});

// Implement GlobalAppContext and return a Provider that houses child components
export const GlobalAppProvider = ({ children }) => {
    // retrieve our GlobalApp dependencies when GlobalAppProvider is instantiated
    // TODO: currently there is nothing to retrieve, once the backend is built out to support settings we need to update this
    useEffect(() => {}, []);

    // replace the settings object with a new settings object
    const updateSettings = (settings: AppSettings) => {
        setGlobalApp(prevState => {
            return {
                ...prevState,
                settings
            };
        });
    };

    // TODO: fetch user/org settings from the backend
    const getSettings = () => {};

    // update the loading status
    const setSettingsLoading = (loading: boolean) => {
        setGlobalApp(prevState => {
            return {
                ...prevState,
                loading
            };
        });
    };

    // set the state of GlobalAppContext
    const globalAppState = {
        settingsLoading: false,
        settings: {},
        showContentModal: false,
        getSettings,
        updateSettings,
        setSettingsLoading,
    };

    const [globalApp, setGlobalApp] = useState<GlobalAppContext>(globalAppState);
    return (
        <GlobalAppContext.Provider value={globalApp}>
            {children}
        </GlobalAppContext.Provider>
    );
}