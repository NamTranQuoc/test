import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path="/admin/dashboard" component={asyncComponent(() => import('./dashboardPage'))}/>
      <Route path="/admin/student" component={asyncComponent(() => import('./userPage/studentPage'))}/>
      <Route path="/admin/teacher" component={asyncComponent(() => import('./userPage/teacherPage'))}/>
      <Route path="/admin/receptionist" component={asyncComponent(() => import('./userPage/receptionistPage'))}/>
      <Route path="/admin/course-category" component={asyncComponent(() => import('./studyPage/courseCategoryPage'))}/>
      <Route path="/admin/course" component={asyncComponent(() => import('./studyPage/coursePage'))}/>
    </Switch>
  </div>
);

export default App;
