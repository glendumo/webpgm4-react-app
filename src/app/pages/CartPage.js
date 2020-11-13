import React, { useState } from "react";

import * as Icon from "react-feather";

import "./CartPage.scss";

const CartPage = ({ children }) => {
    const [cart, setCart] = useState(
        JSON.parse(window.localStorage.getItem("cart"))
    );
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    return (
        <div className="page page--cart">
            <div className="container">
                <h1>My Cart</h1>
                <div className="cart-list">
                    {cart && cart.length > 0 ? (
                        cart.map((item) => {
                            return (
                                <div
                                    className="cart-list-item row align-items-center"
                                    key={item.productId}
                                >
                                    <div className="col-11 row">
                                        <div className="image col-2">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="content col-10 d-flex justify-content-between align-items-center">
                                            <div className="info">
                                                <h4>
                                                    {item.title} -{" "}
                                                    {item.platform}
                                                </h4>
                                                <span>
                                                    <b>{item.amount} *</b> €{" "}
                                                    {item.price}
                                                </span>
                                            </div>
                                            <div className="total-price">
                                                <p>
                                                    €{" "}
                                                    {Math.round(
                                                        item.price *
                                                            item.amount *
                                                            100
                                                    ) / 100}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="delete col-1"
                                        onClick={() => {
                                            const filteredCart = cart.filter(
                                                (cartItem) => {
                                                    return (
                                                        cartItem.productId !==
                                                        item.productId
                                                    );
                                                }
                                            );
                                            window.localStorage.setItem(
                                                "cart",
                                                JSON.stringify(filteredCart)
                                            );

                                            setCart(filteredCart);
                                        }}
                                    >
                                        <Icon.Trash2 />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>There are no items in your cart yet.</p>
                    )}
                </div>
                {/* Bootstrap modal code */}
                {cart && cart.length > 0 ? (
                    <button
                        type="button"
                        className="btn checkout-btn"
                        data-toggle="modal"
                        data-target="#checkoutModal"
                        onClick={() => {
                            setCheckoutSuccess(false);
                            setTimeout(() => {
                                window.localStorage.removeItem("cart");
                                setCart([]);
                                setCheckoutSuccess(!checkoutSuccess);
                            }, 5000);
                        }}
                    >
                        Complete your payment
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn checkout-btn"
                        data-toggle="modal"
                        data-target="#checkoutModal"
                        disabled
                        onClick={() => {
                            setCheckoutSuccess(false);
                            setTimeout(() => {
                                window.localStorage.removeItem("cart");
                                setCart([]);
                                setCheckoutSuccess(!checkoutSuccess);
                            }, 5000);
                        }}
                    >
                        Complete your payment
                    </button>
                )}

                <div
                    className="modal fade"
                    id="checkoutModal"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="checkoutModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="checkoutModalLabel"
                                >
                                    {checkoutSuccess
                                        ? "Successfull purchase"
                                        : "Almost done..."}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">
                                        <Icon.X />
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {checkoutSuccess
                                    ? "Thank you for choosing GameFlash!"
                                    : "Only a few seconds left!"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
