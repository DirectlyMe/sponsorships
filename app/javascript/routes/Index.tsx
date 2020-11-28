import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";

export default (
    <Switch>
        <Route path="/" exact component={Home} />
    </Switch>
);
