import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

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
    const [register, { data }] = useMutation(REGISTER);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    return (
        <div className="page page--register">
            <h1>Register</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register({
                        variables: { email: email, password: password },
                    });
                }}
            >
                <div className="form-control">
                    <span>Email</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <span>Password</span>
                    <input
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
