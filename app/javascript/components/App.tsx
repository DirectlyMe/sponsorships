import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";
import Routes from "../routes/Index";

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
        <Router>
            <AppStyles>{Routes}</AppStyles>
        </Router>
    );
};

export default App;
