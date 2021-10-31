import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "../util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}dashboard`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route exact path={`${match.url}student`} component={asyncComponent(() => import('./userPage/studentPage'))}/>
      <Route exact path={`${match.url}teacher`} component={asyncComponent(() => import('./userPage/teacherPage'))}/>
      <Route exact path={`${match.url}receptionist`} component={asyncComponent(() => import('./userPage/receptionistPage'))}/>
      <Route exact path={`${match.url}course-category`} component={asyncComponent(() => import('./studyPage/courseCategoryPage'))}/>
      <Route exact path={`${match.url}course`} component={asyncComponent(() => import('./studyPage/coursePage'))}/>
    </Switch>
  </div>
);

export default App;
