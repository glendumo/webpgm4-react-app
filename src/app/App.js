import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import { RouteWithLayout } from "./utilities";

import { BaseLayout } from "./layouts";
import { HomePage, GamesPage } from "./pages";

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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
