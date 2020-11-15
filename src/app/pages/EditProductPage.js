import React, { useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import * as Routes from "../routes";

import * as Icon from "react-feather";

import "./EditPages.scss";

const EditProductPage = ({ children }) => {
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [editError, setEditError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.01);
    const [platform, setPlatform] = useState("");
    const [firstImage, setFirstImage] = useState("");
    const [secondImage, setSecondImage] = useState("");
    const [thirdImage, setThirdImage] = useState("");
    const [categories, setCategories] = useState([]);

    const GET_PRODUCTS = gql`
        query Products {
            products {
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
            }
        }
    `;

    const GET_PRODUCT = gql`
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

    const ADD_PRODUCT = gql`
        mutation AddProduct(
            $title: String!
            $description: String!
            $price: Float!
            $platform: Platform!
            $images: [String!]!
            $categories: [ID!]!
        ) {
            addProduct(
                product: {
                    title: $title
                    description: $description
                    price: $price
                    platform: $platform
                    images: $images
                    categories: $categories
                }
            ) {
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
            }
        }
    `;

    const EDIT_PRODUCT = gql`
        mutation UpdateProduct(
            $id: ID!
            $title: String!
            $description: String!
            $price: Float!
            $platform: Platform!
            $images: [String!]!
            $categories: [ID!]!
        ) {
            updateProduct(
                productID: $id
                updatedProduct: {
                    title: $title
                    description: $description
                    price: $price
                    platform: $platform
                    images: $images
                    categories: $categories
                }
            ) {
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
            }
        }
    `;

    const allProducts = useQuery(GET_PRODUCTS);
    const currentProduct = useQuery(GET_PRODUCT, {
        variables: { id },
    });
    const allCategories = useQuery(GET_CATEGORIES);
    const [addProduct] = useMutation(ADD_PRODUCT);
    const [editProduct] = useMutation(EDIT_PRODUCT);

    useEffect(() => {
        if (currentProduct.data && currentProduct.data.product) {
            setTitle(currentProduct.data.product.title);
            setDescription(currentProduct.data.product.description);
            setPrice(currentProduct.data.product.price);
            setPlatform(currentProduct.data.product.platform);
            setFirstImage(currentProduct.data.product.images[0]);
            setSecondImage(currentProduct.data.product.images[1] || "");
            setThirdImage(currentProduct.data.product.images[2] || "");
            setCategories(currentProduct.data.product.categories);
        }
    }, [currentProduct.data]);

    if (redirect) {
        return <Redirect to={Routes.ADMIN} />;
    } else {
        return (
            <div className="page page--edit-product">
                <Link to={Routes.ADMIN} className="back-btn">
                    <Icon.ArrowLeftCircle size={50} />
                </Link>
                <div className="container">
                    <h1>
                        {id !== "new_product" ? "Edit product" : "Add product"}
                    </h1>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                if (id !== "new_product") {
                                    const images = [firstImage];
                                    if (secondImage) {
                                        images.push(secondImage);
                                    }
                                    if (thirdImage) {
                                        images.push(thirdImage);
                                    }

                                    await editProduct({
                                        variables: {
                                            id,
                                            title,
                                            description,
                                            price:
                                                (Math.round(parseFloat(price)) *
                                                    100) /
                                                100,
                                            platform,
                                            images,
                                            categories,
                                        },
                                    });
                                    allProducts.refetch();
                                    setRedirect(!redirect);
                                } else {
                                    const images = [firstImage];
                                    if (secondImage) {
                                        images.push(secondImage);
                                    }
                                    if (thirdImage) {
                                        images.push(thirdImage);
                                    }
                                    await addProduct({
                                        variables: {
                                            title,
                                            description,
                                            price:
                                                (Math.round(parseFloat(price)) *
                                                    100) /
                                                100,
                                            platform,
                                            images,
                                            categories,
                                        },
                                    });
                                    allProducts.refetch();
                                    setRedirect(!redirect);
                                }
                            } catch (error) {
                                setEditError(error.message);
                            }
                        }}
                    >
                        <div className="row">
                            <label className="col-3">Title</label>
                            <input
                                type="text"
                                className="col-3"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div className="row">
                            <label className="col-3">Description</label>
                            <textarea
                                className="col-6"
                                rows="5"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div className="row">
                            <label className="col-3">Price</label>
                            <input
                                type="text"
                                className="col-1"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="row">
                            <label className="col-3">Platform</label>
                            <select
                                className="col-2"
                                onChange={(e) => setPlatform(e.target.value)}
                            >
                                {id !== "new_product" &&
                                platform === "PlayStation" ? (
                                    <option value="PlayStation" selected>
                                        PlayStation
                                    </option>
                                ) : (
                                    <option value="PlayStation">
                                        PlayStation
                                    </option>
                                )}
                                {id !== "new_product" && platform === "Xbox" ? (
                                    <option value="Xbox" selected>
                                        Xbox
                                    </option>
                                ) : (
                                    <option value="Xbox">Xbox</option>
                                )}
                                {id !== "new_product" && platform === "PC" ? (
                                    <option value="PC" selected>
                                        PC
                                    </option>
                                ) : (
                                    <option value="PC">PC</option>
                                )}
                            </select>
                        </div>
                        <div className="row">
                            <label className="col-3">Image (1)</label>
                            <input
                                type="url"
                                className="col-3"
                                value={firstImage}
                                onChange={(e) => {
                                    setFirstImage(e.target.value);
                                }}
                            />
                        </div>
                        {firstImage ? (
                            <div className="row">
                                <label className="col-3">Image (2)</label>
                                <input
                                    type="url"
                                    className="col-3"
                                    value={secondImage}
                                    onChange={(e) => {
                                        setSecondImage(e.target.value);
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {secondImage ? (
                            <div className="row">
                                <label className="col-3">Image (3)</label>
                                <input
                                    type="url"
                                    className="col-3"
                                    value={thirdImage}
                                    onChange={(e) => {
                                        setThirdImage(e.target.value);
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="row">
                            <label className="col-3">Categories</label>
                            <div className="col-9 row">
                                {allCategories.data.categories.map(
                                    (category) => (
                                        <div
                                            className="col-3"
                                            key={category.id}
                                        >
                                            <input
                                                type="checkbox"
                                                value={category.id}
                                            />
                                            <label>{category.name}</label>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <button type="submit" className="btn edit-btn">
                            {id !== "new_product"
                                ? "Save changes"
                                : "Add Product"}
                        </button>
                        <br />
                        <span>{editError ? editError : ""}</span>
                    </form>
                </div>
            </div>
        );
    }
};

export default EditProductPage;
