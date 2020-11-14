import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import * as Routes from "../routes";

import * as Icon from "react-feather";

import "./GamesPage.scss";

const GamesPage = ({ children }) => {
    const [platform, setPlatform] = useState("all");
    const [categoryId, setCategoryId] = useState("all");
    const [filteredProducts, setFilteredProducts] = useState([]);

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
            }
        }
    `;
    const GET_CATEGORIES = gql`
        {
            categories {
                id
                name
            }
        }
    `;

    const products = useQuery(GET_PRODUCTS);
    const categories = useQuery(GET_CATEGORIES);

    useEffect(() => {
        if (products.data && products.data.products.length > 0) {
            setFilteredProducts(products.data.products);
        }
    }, [products]);

    if (products.loading) return "Loading...";
    if (categories.loading) return "Loading...";
    if (products.error) return `Error! ${products.error.message}`;
    if (categories.error) return `Error! ${categories.error.message}`;

    return (
        <div className="page page--games">
            <div className="container">
                <form
                    className="products-filter"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log(filteredProducts);
                        let filteringProducts = [];
                        if (platform === "all") {
                            filteringProducts = products.data.products;
                        } else {
                            filteringProducts = products.data.products.filter(
                                (product) => {
                                    return product.platform === platform;
                                }
                            );
                        }
                        if (categoryId === "all") {
                            setFilteredProducts(filteringProducts);
                        } else {
                            filteringProducts = products.data.products.filter(
                                (product) => {
                                    let exists = false;
                                    product.categories.forEach((category) => {
                                        if (category.id === categoryId) {
                                            exists = true;
                                        }
                                    });
                                    return exists;
                                }
                            );
                            setFilteredProducts(filteringProducts);
                        }
                    }}
                >
                    <div className="filter-inputs row justify-content-center align-items-center">
                        <div className="form-item">
                            <label>Platform</label>
                            <br />
                            <select
                                name="platform"
                                id="platform"
                                onChange={(e) => {
                                    setPlatform(e.target.value);
                                }}
                            >
                                <option value="all">All</option>
                                <option value="PlayStation">PlayStation</option>
                                <option value="Xbox">Xbox</option>
                                <option value="PC">PC</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <label>Category</label>
                            <br />
                            <select
                                name="category"
                                id="category"
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                }}
                            >
                                <option value="all">All</option>
                                {categories.data.categories.map((category) => (
                                    <option
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn filter-btn">
                            <Icon.Filter /> Fitler
                        </button>
                    </div>
                </form>
                <div className="products-list row">
                    {filteredProducts.map((product) => (
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
                                    <span className="price">
                                        {product.price}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamesPage;
