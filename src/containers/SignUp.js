import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {Link, useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {hideMessage, userSignUp,} from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;

const SignUp = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {showMessage, authUser} = useSelector(({auth}) => auth);


    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                dispatch(hideMessage());
            }, 100);
        }
        if (authUser !== null) {
            history.push('/');
        }
    });

    const onFinishFailed = errorInfo => {
    };

    const onFinish = values => {
        dispatch(userSignUp(values));
    };

    return (
        <div className="gx-app-login-wrap">
            <div className="gx-app-login-container">
                <div className="gx-app-login-main-content">
                    <div className="gx-app-logo-content">
                        <div className="gx-app-logo-content-bg">
                            <img src={"https://via.placeholder.com/272x395"} alt='Neature'/>
                        </div>
                        <div className="gx-app-logo-wid">
                            <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                            <p><IntlMessages id="app.userAuth.bySigning"/></p>
                            <p><IntlMessages id="app.userAuth.getAccount"/></p>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="example" src="/assets/images/logo.png"/>
                        </div>
                    </div>

                    <div className="gx-app-login-content">
                        <Form
                            initialValues={{remember: true}}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="gx-signin-form gx-form-row0">
                            <FormItem rules={[{required: true, message: 'Please input your username!'}]}
                                      name="Username">
                                <Input placeholder="Username"/>
                            </FormItem>

                            <FormItem name="email" rules={[{
                                required: true, type: 'email', message: 'The input is not valid E-mail!',
                            }]}>
                                <Input placeholder="Email"/>
                            </FormItem>
                            <FormItem name="password"
                                      rules={[{required: true, message: 'Please input your Password!'}]}>
                                <Input type="password" placeholder="Password"/>
                            </FormItem>
                            <FormItem name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                                <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot
                                    password</Link>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" className="gx-mb-0" htmlType="submit">
                                    <IntlMessages id="app.userAuth.signUp"/>
                                </Button>
                                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                                id="app.userAuth.signIn"/></Link>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SignUp;
