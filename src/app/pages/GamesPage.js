import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as Routes from "../routes";

import "./GamesPage.scss";

const GamesPage = ({ children }) => {
    const GET_PRODUCTS = gql`
        {
            products {
                id
                title
                price
                platform
                images
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div className="page page--games">
            <div className="container">
                <div className="products-list row">
                    {data.products.map((product) => (
                        <Link
                            to={Routes.GAME_DETAIL.replace(":id", product.id)}
                            className="col-6 col-md-4 col-lg-3"
                            key={product.id}
                        >
                            <div className="products-list-item">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                />
                                <div className="overlay"></div>
                                <p className="title">{product.title}</p>
                                <span className="platform">
                                    {product.platform}
                                </span>
                                <span className="price">{product.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamesPage;
