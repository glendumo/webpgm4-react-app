import React from "react";
import { Link, NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as Routes from "../routes";

const GamesPage = ({ children }) => {
    const GET_PRODUCTS = gql`
        {
            products {
                id
                title
                price
                platform
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container">
            <div className="products-list row">
                {data.products.map((product) => (
                    <Link
                        to={Routes.GAME_DETAIL.replace(":id", product.id)}
                        className="col-6 col-md-4"
                    >
                        <div className="products-list-item">
                            <h1>{product.title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GamesPage;
