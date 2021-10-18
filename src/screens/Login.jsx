import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {login} from "../service/AuthService";
import {showNotification} from "../components/common/NotifyCation";
import {getToken, setToken} from "../components/common/Utils";

function Login (){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    function onSubmitLogin(e) {
        e.preventDefault();
        login(username, password).then((Response) => {
            if (Response.data.code !== -9999) {
                setToken(Response.data.payload);
                setLoggedInUser( true);
            } else {
                showNotification(Response.data.message);
            }
        });
    }

    if (getToken() != null || loggedInUser) {
        return (
            <Redirect
                to={{
                    pathname: "/admin/dashboard",
                    //TODO later
                    // state: {
                    //     from: this.state,
                    // },
                }}
            />
        );
    }
    return (
        <div id="app">
            <section className="section">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                            <div className="login-brand">
                                <img
                                    src="../assets/img/stisla-fill.svg"
                                    alt="logo"
                                    width={100}
                                    className="shadow-light rounded-circle"
                                />
                            </div>
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4>Login</h4>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="username"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                tabIndex={1}
                                                required
                                                autoFocus
                                                value={username}
                                                onChange={(event)=>{
                                                    setUsername(event.target.value)
                                                }}
                                            />
                                            <div className="invalid-feedback">
                                                Please fill in your email
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="d-block">
                                                <label htmlFor="password" className="control-label">
                                                    Password
                                                </label>
                                                <div className="float-right">
                                                    <a
                                                        href="auth-forgot-password.html"
                                                        className="text-small"
                                                    >
                                                        Forgot Password?
                                                    </a>
                                                </div>
                                            </div>
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                tabIndex={2}
                                                required
                                                value={password}
                                                onChange={(event)=>{
                                                    setPassword(event.target.value)
                                                }}
                                            />
                                            <div className="invalid-feedback">
                                                please fill in your password
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="remember"
                                                    className="custom-control-input"
                                                    tabIndex={3}
                                                    id="remember-me"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="remember-me"
                                                >
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                className="btn btn-primary btn-lg btn-block"
                                                tabIndex={4}
                                                onClick={onSubmitLogin}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                    <div className="text-center mt-4 mb-3">
                                        <div className="text-job text-muted">
                                            Login With Social
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-muted text-center">
                                Don't have an account?{" "}
                                <a href="auth-register.html">Create One</a>
                            </div>
                            <div className="simple-footer">Copyright © Stisla 2018</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
