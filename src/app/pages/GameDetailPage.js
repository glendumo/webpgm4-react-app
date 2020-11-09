import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as Routes from "../routes";

import * as Icon from "react-feather";

import "./GameDetailPage.scss";

const GameDetailPage = ({ children }) => {
    const { id } = useParams();

    const GET_PRODUCT_DETAIL = gql`
        query Product($id: ID!) {
            product(id: $id) {
                id
                title
                description
                price
                platform
                images
                categories {
                    id
                    name
                }
                created_on
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
        variables: { id },
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div className={`bg-${data.product.platform}`}>
            <div className="page page--game-detail">
                <Link to={Routes.GAMES} className="back-btn">
                    <Icon.ArrowLeftCircle size={50} />
                </Link>
                <div className="container">
                    <div className="row">
                        <div className="detail-images col-12 col-md-6">
                            {data.product.images.map((image) => (
                                <img src={image} alt={image} key={image} />
                            ))}
                        </div>
                        <div className="detail-content col-12 col-md-6">
                            <h1>
                                {data.product.title} - {data.product.platform}
                            </h1>
                            <p className="price">€ {data.product.price}</p>
                            <p>{data.product.description}</p>
                            <button
                                type="submit"
                                className="btn add-to-cart-btn"
                            >
                                <Icon.ShoppingCart /> Add to cart
                            </button>
                            <ul className="categories-list">
                                <h3>categories</h3>
                                {data.product.categories.map((category) => (
                                    <li
                                        className="categories-list-item"
                                        key={category.id}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailPage;
