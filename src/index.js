import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import {
    ApolloProvider,
    ApolloLink,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";

import "jquery/dist/jquery.slim.min";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";

// create the http link for the API
const httpLink = new HttpLink({
    uri:
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : "https://webpgm4-graphql-glendumo.herokuapp.com/",
});

// create the authentication header
const authLink = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists
    const token = "";

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});

// init apolloclient
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
