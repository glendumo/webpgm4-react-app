import React from "react";
import { Link } from "react-router-dom";

import * as Icon from "react-feather";

import * as Routes from "../../routes";

import "./Footer.scss";

const Footer = ({ children }) => {
    return (
        <footer className="app-footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <ul className="nav flex-column">
                            <h2>Sitemap</h2>
                            <li className="nav-item">
                                <Link to={Routes.HOME} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={Routes.GAMES} className="nav-link">
                                    Our Games
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="contact">
                            <h2>Connect with us</h2>
                            <div className="contact-item">
                                <a
                                    href="tel:+3212345678"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <Icon.Phone />
                                    <span>+32 1 234 56 78</span>
                                </a>
                            </div>
                            <div className="contact-item">
                                <a
                                    href="mailto:support.gameflash@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <Icon.Mail />
                                    <span>support.gameflash@gmail.com</span>
                                </a>
                            </div>
                            <div className="contact-item">
                                <a
                                    href="https://www.facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <Icon.Facebook />
                                    <span>Our Facebook</span>
                                </a>
                            </div>
                            <div className="contact-item">
                                <a
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <Icon.Instagram />
                                    <span>Our Instagram</span>
                                </a>
                            </div>
                            <div className="contact-item">
                                <a
                                    href="https://www.twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    <Icon.Twitter />
                                    <span>Our Twitter</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="legal">
                <span>©2020</span>
                <span>Made by Glenn Dumoulin</span>
            </div>
        </footer>
    );
};

export default Footer;
