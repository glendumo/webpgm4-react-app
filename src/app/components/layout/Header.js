import React from "react";
import { Link, NavLink } from "react-router-dom";

import * as Icon from "react-feather";

import * as Routes from "../../routes";

import "./Header.scss";

const Header = ({ children }) => {
    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-md navigation">
                <h1 className="navbar-brand">
                    <Link to={Routes.LANDING} className="logo__link">
                        GameFlash
                    </Link>
                </h1>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <Icon.Menu className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto justify-content-end flex-grow-1">
                        <li className="nav-item ">
                            <NavLink to={Routes.HOME} className="nav-link">
                                <Icon.Home />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={Routes.GAMES}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Our Games
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={Routes.CONTACT}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={Routes.LOGIN}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to={Routes.CART}
                                className="nav-link"
                                activeClassName="active"
                            >
                                <Icon.ShoppingCart />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;