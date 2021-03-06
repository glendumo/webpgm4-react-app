import React from "react";
import { Link, Redirect } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import * as Routes from "../routes";

import * as Icon from "react-feather";

import "./AdminPage.scss";

const AdminPage = ({ children }) => {
    const GET_USER = gql`
        query User($id: ID!) {
            user(id: $id) {
                id
                isAdmin
            }
        }
    `;
    const GET_PRODUCTS = gql`
        query Products {
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
        query Categories {
            categories {
                id
                name
            }
        }
    `;

    const DELETE_PRODUCT = gql`
        mutation deleteProduct($productID: ID!) {
            deleteProduct(productID: $productID) {
                id
            }
        }
    `;
    const DELETE_CATEGORY = gql`
        mutation deleteCategory($categoryID: ID!) {
            deleteCategory(categoryID: $categoryID) {
                id
            }
        }
    `;

    const [deleteProduct] = useMutation(DELETE_PRODUCT);
    const [deleteCategory] = useMutation(DELETE_CATEGORY);

    const user = JSON.parse(window.localStorage.getItem("user"));
    let userId = "";
    if (user) {
        userId = user.userId;
    }

    const { data } = useQuery(GET_USER, {
        variables: { id: userId },
    });

    const products = useQuery(GET_PRODUCTS);
    const categories = useQuery(GET_CATEGORIES);

    if (products.loading) return "Loading...";
    if (categories.loading) return "Loading...";
    if (products.error) return `Error! ${products.error.message}`;
    if (categories.error) return `Error! ${categories.error.message}`;

    if (data && data.user.isAdmin) {
        return (
            <div className="page page--admin">
                <div className="container">
                    <h1>Welcome to the admin page</h1>
                    <div className="products-list row align-items-center">
                        <h2 className="col-8">All Products</h2>
                        <Link
                            to={Routes.EDIT_PRODUCT.replace(
                                ":id",
                                "new_product"
                            )}
                            className="btn btn-success col-4"
                        >
                            <Icon.Plus /> Add new product
                        </Link>
                        {products.data && products.data.products.length > 0 ? (
                            products.data.products.map((product) => (
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
                                            <p className="title">
                                                {product.title}
                                            </p>
                                            <span className="platform">
                                                {product.platform}
                                            </span>
                                            <span className="price">
                                                {product.price}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="buttons row justify-content-around">
                                        <Link
                                            to={Routes.EDIT_PRODUCT.replace(
                                                ":id",
                                                product.id
                                            )}
                                            className="btn btn-primary"
                                        >
                                            <Icon.Edit /> Edit
                                        </Link>
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            id={product.id}
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                try {
                                                    await deleteProduct({
                                                        variables: {
                                                            productID:
                                                                e.target.id,
                                                        },
                                                    });
                                                    products.refetch();
                                                } catch (error) {
                                                    alert(error.message);
                                                }
                                            }}
                                        >
                                            <Icon.Trash2 /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>There were no products found!</p>
                        )}
                    </div>
                    <div className="categories-list row align-items-center">
                        <h2 className="col-8">All Categories</h2>
                        <Link
                            to={Routes.EDIT_CATEGORY.replace(
                                ":id",
                                "new_category"
                            )}
                            className="btn btn-success col-4"
                        >
                            <Icon.Plus /> Add new category
                        </Link>
                        {categories.data &&
                        categories.data.categories.length > 0 ? (
                            categories.data.categories.map((category) => (
                                <div
                                    className="categories-list-item col-12 col-md-6 row align-items-center"
                                    key={category.id}
                                >
                                    <p className="col-5">{category.name}</p>
                                    <div className="buttons col-7">
                                        <Link
                                            to={Routes.EDIT_CATEGORY.replace(
                                                ":id",
                                                category.id
                                            )}
                                            className="btn btn-primary"
                                        >
                                            <Icon.Edit /> Edit
                                        </Link>
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            id={category.id}
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                try {
                                                    await deleteCategory({
                                                        variables: {
                                                            categoryID:
                                                                e.target.id,
                                                        },
                                                    });
                                                    categories.refetch();
                                                } catch (error) {
                                                    alert(error.message);
                                                }
                                            }}
                                        >
                                            <Icon.Trash2 /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>There were no categories found!</p>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Redirect to={Routes.HOME} />;
    }
};

export default AdminPage;
