import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path="/admin/dashboard" component={asyncComponent(() => import('./dashboardPage'))}/>
    </Switch>
  </div>
);

export default App;
