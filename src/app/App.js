import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import { RouteWithLayout } from "./utilities";

import { BaseLayout } from "./layouts";
import {
    HomePage,
    GamesPage,
    GameDetailPage,
    CartPage,
    RegisterPage,
    LoginPage,
    LogoutPage,
    AdminPage,
    EditProductPage,
    EditCategoryPage,
} from "./pages";

import * as Routes from "./routes";

import "./App.scss";

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <RouteWithLayout
                        exact
                        path={Routes.LANDING}
                        layout={BaseLayout}
                        component={HomePage}
                    />
                    <Redirect from={Routes.HOME} to={Routes.LANDING} />
                    <RouteWithLayout
                        exact
                        path={Routes.GAMES}
                        layout={BaseLayout}
                        component={GamesPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.GAME_DETAIL}
                        layout={BaseLayout}
                        component={GameDetailPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.CART}
                        layout={BaseLayout}
                        component={CartPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.REGISTER}
                        layout={BaseLayout}
                        component={RegisterPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.LOGIN}
                        layout={BaseLayout}
                        component={LoginPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.LOGOUT}
                        layout={BaseLayout}
                        component={LogoutPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.ADMIN}
                        layout={BaseLayout}
                        component={AdminPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.EDIT_PRODUCT}
                        layout={BaseLayout}
                        component={EditProductPage}
                    />
                    <RouteWithLayout
                        exact
                        path={Routes.EDIT_CATEGORY}
                        layout={BaseLayout}
                        component={EditCategoryPage}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
