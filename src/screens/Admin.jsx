import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../components/admin/Dashboard";
import ManagerStudents from "../components/admin/ManagerStudents";
import ImageUpload from "../components/common/ImageUpload";
import {Route, Switch} from "react-router-dom";

function Admin() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/abc" component={ImageUpload} />
                <Route exact path="/admin/student" component={ManagerStudents} />
            </Switch>
        </div>
    );
}

export default Admin;
