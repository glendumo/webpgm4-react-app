import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as Routes from "../routes";

import "./HomePage.scss";

const HomePage = ({ children }) => {
    const [recentProducts, setRecentProducts] = useState([]);

    const GET_PRODUCTS = gql`
        {
            products {
                id
                title
                price
                platform
                categories {
                    id
                    name
                }
                images
                created_on
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_PRODUCTS);

    useEffect(() => {
        if (data && data.products.length > 0) {
            const sortOnDate = (a, b) => {
                if (a.created_on < b.created_on) return 1;
                if (a.created_on > b.created_on) return -1;
                else return 0;
            };
            const spreadedArray = [...data.products];
            let sortedArray = spreadedArray.sort(sortOnDate);
            sortedArray = sortedArray.slice(0, 4);
            setRecentProducts(sortedArray);
        }
    }, [data]);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div className="page page--home">
            <div className="container">
                <h1>
                    Welcome at <span>GameFlash</span>
                </h1>
                <div className="recent-list row">
                    <h2 className="col-12">Recently added</h2>
                    {recentProducts.map((product) => (
                        <div
                            className="col-6 col-md-4 col-lg-3"
                            key={product.id}
                        >
                            <Link
                                to={Routes.GAME_DETAIL.replace(
                                    ":id",
                                    product.id
                                )}
                            >
                                <div className="recent-list-item">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                    />
                                    <div className="overlay"></div>
                                    <p className="title">{product.title}</p>
                                    <span className="platform">
                                        {product.platform}
                                    </span>
                                    <span className="price">
                                        {product.price}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <Link
                        to={Routes.GAMES}
                        className="btn full-collection-btn col-12"
                    >
                        Take a look at our full collection
                    </Link>
                </div>
                <div className="register row justify-content-center">
                    <Link
                        to={Routes.REGISTER}
                        className="btn register-btn col-6"
                    >
                        Create an account now for a smoother experience
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
