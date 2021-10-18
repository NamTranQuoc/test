import Sidebar from "../../components/Sidebar/Sidebar";
import React from "react";
import {clearToken} from "../common/Utils";

function Navbar() {
    return (
        <div>
            <div className="navbar-bg"/>
            <nav className="navbar navbar-expand-lg main-navbar custom-css-011">
                <form className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3">
                        <li>
                            <a
                                href="# "
                                data-toggle="sidebar"
                                className="nav-link nav-link-lg"
                            >
                                <i className="fas fa-bars"/>
                            </a>
                        </li>
                        <li>
                            <a
                                href="# "
                                data-toggle="search"
                                className="nav-link nav-link-lg d-sm-none"
                            >
                                <i className="fas fa-search"/>
                            </a>
                        </li>
                    </ul>
                </form>
                <ul className="navbar-nav navbar-right">
                    <li className="dropdown dropdown-list-toggle">
                        <a
                            href="# "
                            data-toggle="dropdown"
                            className="nav-link notification-toggle nav-link-lg beep"
                        >
                            <i className="far fa-bell"/>
                        </a>
                        <div className="dropdown-menu dropdown-list dropdown-menu-right">
                            <div className="dropdown-header">
                                Notifications
                                <div className="float-right">
                                    <a href="# ">Mark All As Read</a>
                                </div>
                            </div>
                            <div className="dropdown-list-content dropdown-list-icons">
                                <a href="# " className="dropdown-item dropdown-item-unread">
                                    <div className="dropdown-item-icon bg-primary text-white">
                                        <i className="fas fa-code"/>
                                    </div>
                                    <div className="dropdown-item-desc">
                                        Template update is available now!
                                        <div className="time text-primary">2 Min Ago</div>
                                    </div>
                                </a>
                                <a href="# " className="dropdown-item">
                                    <div className="dropdown-item-icon bg-info text-white">
                                        <i className="far fa-user"/>
                                    </div>
                                    <div className="dropdown-item-desc">
                                        <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                                        <div className="time">10 Hours Ago</div>
                                    </div>
                                </a>
                                <a href="# " className="dropdown-item">
                                    <div className="dropdown-item-icon bg-success text-white">
                                        <i className="fas fa-check"/>
                                    </div>
                                    <div className="dropdown-item-desc">
                                        <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to{" "}
                                        <b>Done</b>
                                        <div className="time">12 Hours Ago</div>
                                    </div>
                                </a>
                                <a href="# " className="dropdown-item">
                                    <div className="dropdown-item-icon bg-danger text-white">
                                        <i className="fas fa-exclamation-triangle"/>
                                    </div>
                                    <div className="dropdown-item-desc">
                                        Low disk space. Let's clean it!
                                        <div className="time">17 Hours Ago</div>
                                    </div>
                                </a>
                                <a href="# " className="dropdown-item">
                                    <div className="dropdown-item-icon bg-info text-white">
                                        <i className="fas fa-bell"/>
                                    </div>
                                    <div className="dropdown-item-desc">
                                        Welcome to Stisla template!
                                        <div className="time">Yesterday</div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-footer text-center">
                                <a href="# ">
                                    View All <i className="fas fa-chevron-right"/>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a
                            href="# "
                            data-toggle="dropdown"
                            className="nav-link dropdown-toggle nav-link-lg nav-link-user"
                        >
                            <img
                                alt="avatar"
                                src="../assets/img/avatar/avatar-1.png"
                                className="rounded-circle mr-1"
                            />
                            <div className="d-sm-none d-lg-inline-block">
                                Hi, Ujang Maman
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-title">Logged in 5 min ago</div>
                            <a
                                href="features-profile.html"
                                className="dropdown-item has-icon"
                            >
                                <i className="far fa-user"/> Profile
                            </a>
                            <a
                                href="features-activities.html"
                                className="dropdown-item has-icon"
                            >
                                <i className="fas fa-bolt"/> Activities
                            </a>
                            <a
                                href="features-settings.html"
                                className="dropdown-item has-icon"
                            >
                                <i className="fas fa-cog"/> Settings
                            </a>
                            <div className="dropdown-divider"/>
                            <a href="/login" className="dropdown-item has-icon text-danger" onClick={clearToken}>
                                <i className="fas fa-sign-out-alt"/> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <Sidebar/>
        </div>
    );
}

export default Navbar;
