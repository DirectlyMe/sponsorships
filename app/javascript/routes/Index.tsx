import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import UserUploads from "../components/UserUploads";
import UserProfile from "../components/UserProfile";

export default (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user-uploads" exact component={UserUploads} />
        <Route path="/user-profile" exact component={UserProfile} />
    </Switch>
);
