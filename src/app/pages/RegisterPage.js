import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";

import * as Routes from "../routes";

import "./UserPages.scss";

const RegisterPage = ({ children }) => {
    const REGISTER = gql`
        mutation register($email: String!, $password: String!) {
            register(user: { email: $email, password: $password }) {
                id
            }
        }
    `;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [register, { data }] = useMutation(REGISTER);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (data) {
            setRedirect(!redirect);
        }
    }, [data, redirect]);

    if (redirect) {
        return <Redirect to={Routes.LOGIN} />;
    }

    return (
        <div className="page page--register">
            <div className="container">
                <h1>Register</h1>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            await register({
                                variables: { email: email, password: password },
                            });
                        } catch (error) {
                            setRegisterError(error.message);
                        }
                    }}
                >
                    <div className="form-item">
                        <label>Email</label>
                        <br />
                        <input
                            type="text"
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
                    <button type="submit">Register</button>
                    {registerError ? (
                        <p className="error">{registerError}</p>
                    ) : (
                        ""
                    )}
                    <p>
                        <Link to={Routes.LOGIN}>Already have an account?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
