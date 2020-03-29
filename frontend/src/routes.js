import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Incident from "./pages/Incident";
import NotFound from "./pages/NotFound";

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/incidents/new" component={Incident}></Route>
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
}
export default Routes;
