import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";

import * as Routes from "../routes";

import "./UserPages.scss";

const LoginPage = ({ children }) => {
    const LOGIN = gql`
        query Login($email: String!, $password: String!) {
            login(user: { email: $email, password: $password }) {
                userId
                token
            }
        }
    `;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [login, { error, data }] = useLazyQuery(LOGIN);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (data && !error) {
            const userData = {
                userId: data.login.userId,
                token: data.login.token,
            };

            window.localStorage.setItem("user", JSON.stringify(userData));

            if (userData.userId) {
                setRedirect(!redirect);
            }
        }
        if (error) {
            setLoginError(error.message);
        }
    }, [data, error, redirect]);

    if (redirect) {
        return <Redirect to={Routes.HOME} />;
    } else {
        return (
            <div className="page page--login">
                <div className="container">
                    <h1>Login</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login({
                                variables: { email: email, password: password },
                            });
                        }}
                    >
                        <div className="form-item">
                            <label>Email</label>
                            <br />
                            <input
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-item">
                            <label>Password</label>
                            <br />
                            <input
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                        {loginError ? (
                            <p className="error">{loginError}</p>
                        ) : (
                            ""
                        )}
                        <p>
                            <Link to={Routes.REGISTER}>
                                Don't have an account yet?
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
};

export default LoginPage;
