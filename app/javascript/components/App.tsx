import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";
import Routes from "../routes/Index";
import Layout from "./Layout";
import { UserProvider } from "../contexts/UserContext";

// global app styles
const AppStyles = styled.div`
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");
    font-family: "Roboto", sans-serif;
`;

/**
 * The web-app start point
 */
const App = () => {
    return (
        <AppStyles>
            <Router>
                <UserProvider>
                    <Layout>
                        {Routes}
                    </Layout>
                </UserProvider>
            </Router>
        </AppStyles>
    );
};

export default App;
