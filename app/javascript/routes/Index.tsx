import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import UserUploads from "../components/UserUploads";
import UserProfile from "../components/UserProfile";

export default (
    <Switch>
        <Route path="/" exact component={Home} />
    </Switch>
);
