import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as Routes from "../routes";

import * as Icon from "react-feather";

import "./GameDetailPage.scss";

const GameDetailPage = ({ children }) => {
    const { id } = useParams();

    const [amount, setAmount] = useState(1);
    const [addToCartError, setAddToCartError] = useState("");

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
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    let cartItem = {
                                        productId: id,
                                        title: data.product.title,
                                        price: data.product.price,
                                        platform: data.product.platform,
                                        image: data.product.images[0],
                                        amount: amount,
                                    };

                                    let cart = JSON.parse(
                                        window.localStorage.getItem("cart")
                                    );
                                    if (!cart) {
                                        cart = [];
                                    }

                                    const inCart = cart.find((item) => {
                                        return item.productId === id;
                                    });

                                    if (!inCart) {
                                        cart.push(cartItem);

                                        window.localStorage.setItem(
                                            "cart",
                                            JSON.stringify(cart)
                                        );
                                    } else {
                                        setAddToCartError(
                                            "This item is already in your cart"
                                        );
                                    }
                                }}
                            >
                                <input
                                    type="number"
                                    value={amount}
                                    min="1"
                                    max="25"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="btn add-to-cart-btn"
                                >
                                    <Icon.ShoppingCart /> Add to cart
                                </button>
                                <span className="add-to-cart-error">
                                    {addToCartError}
                                </span>
                            </form>
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
