import React from "react";
import { Redirect } from "react-router-dom";

import * as Routes from "../routes";

const LogoutPage = ({ children }) => {
    window.localStorage.removeItem("user");

    return <Redirect to={Routes.HOME} />;
};

export default LogoutPage;
