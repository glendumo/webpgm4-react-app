import React, { useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import * as Routes from "../routes";

import * as Icon from "react-feather";

import "./EditPages.scss";

const EditCategoryPage = ({ children }) => {
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [editError, setEditError] = useState("");
    const [name, setName] = useState("");

    const GET_CATEGORIES = gql`
        query Categories {
            categories {
                id
                name
            }
        }
    `;

    const GET_CATEGORY = gql`
        query Category($id: ID!) {
            category(id: $id) {
                id
                name
            }
        }
    `;

    const ADD_CATEGORY = gql`
        mutation AddCategory($name: String!) {
            addCategory(category: { name: $name }) {
                id
                name
            }
        }
    `;

    const EDIT_CATEGORY = gql`
        mutation UpdateCategory($id: ID!, $name: String!) {
            updateCategory(categoryID: $id, updatedCategory: { name: $name }) {
                id
                name
            }
        }
    `;

    const allCategories = useQuery(GET_CATEGORIES);
    const currentCategory = useQuery(GET_CATEGORY, {
        variables: { id },
    });
    const [addCategory] = useMutation(ADD_CATEGORY);
    const [editCategory] = useMutation(EDIT_CATEGORY);

    useEffect(() => {
        if (currentCategory.data && currentCategory.data.category) {
            setName(currentCategory.data.category.name);
        }
    }, [currentCategory.data]);

    if (redirect) {
        return <Redirect to={Routes.ADMIN} />;
    } else {
        return (
            <div className="page page--edit-category">
                <Link to={Routes.ADMIN} className="back-btn">
                    <Icon.ArrowLeftCircle size={50} />
                </Link>
                <div className="container">
                    <h1>
                        {id !== "new_category"
                            ? "Edit category"
                            : "Add category"}
                    </h1>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                if (id !== "new_category") {
                                    await editCategory({
                                        variables: { id, name },
                                    });
                                    allCategories.refetch();
                                    setRedirect(!redirect);
                                } else {
                                    await addCategory({ variables: { name } });
                                    allCategories.refetch();
                                    setRedirect(!redirect);
                                }
                            } catch (error) {
                                setEditError(error.message);
                            }
                        }}
                    >
                        <div className="row">
                            <label className="col-3">Name</label>
                            <input
                                type="text"
                                className="col-3"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <button type="submit" className="btn edit-btn">
                            {id !== "new_category"
                                ? "Save changes"
                                : "Add Category"}
                        </button>
                        <br />
                        <span>{editError ? editError : ""}</span>
                    </form>
                </div>
            </div>
        );
    }
};

export default EditCategoryPage;
