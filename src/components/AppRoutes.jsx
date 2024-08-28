import React from 'react';
import {Route, Routes} from "react-router-dom";
import Books from "../pages/Books/Books";
import Error from "../pages/Error";
import Authors from "../pages/Authors/Authors";
import BookIdPage from "../pages/Books/BookIdPage";
import BookRedact from "../pages/Books/BookRedact";
import AddNewBook from "../pages/Books/AddNewBook";
import AuthorIdPage from "../pages/Authors/AuthorIdPage";
import AuthorRedact from "../pages/Authors/AuthorRedact";
import AddNewAuthor from "../pages/Authors/AddNewAuthor";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path = "/books"
                element={<Books/>}
            />
            <Route
                path = "/books/:id"
                element={<BookIdPage/>}
            />
            <Route
                path = "/books/:id/redact"
                element={<BookRedact/>}
            />
            <Route
                path = "/books/add"
                element={<AddNewBook/>}
            />
            <Route
                path = "/authors"
                element={<Authors/>}
            />
            <Route
                path = "/authors/:id"
                element={<AuthorIdPage/>}
            />
            <Route
                path = "/authors/:id/redact"
                element={<AuthorRedact/>}
            />
            <Route
                path = "/authors/add"
                element={<AddNewAuthor/>}
            />
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default AppRoutes;