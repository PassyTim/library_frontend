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
import Registration from "../pages/Auth/Registration";
import Login from "../pages/Auth/Login";
import RequireAuth from "./RequireAuth";
import Unauthorized from "../pages/Unauthorized";
import PersistLogin from "./PersistLogin";
import UserInfo from "../pages/UserInfo";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                element={<PersistLogin/>}
            >
                <Route element={<RequireAuth allowedRoles={['User', 'Admin']}/>}>
                    <Route
                        path = "/user"
                        element={<UserInfo/>}
                    />
                    <Route
                        path = "/books"
                        element={<Books/>}
                    />
                    <Route
                        path = "/books/:id"
                        element={<BookIdPage/>}
                    />
                    <Route
                        path = "/authors"
                        element={<Authors/>}
                    />
                    <Route
                        path = "/authors/:id"
                        element={<AuthorIdPage/>}
                    />
                </Route>

                <Route element={<RequireAuth allowedRoles={['Admin']}/>}>
                    <Route
                        path = "/books/:id/redact"
                        element={<BookRedact/>}
                    />
                    <Route
                        path = "/books/add"
                        element={<AddNewBook/>}
                    />

                    <Route
                        path = "/authors/:id/redact"
                        element={<AuthorRedact/>}
                    />
                    <Route
                        path = "/authors/add"
                        element={<AddNewAuthor/>}
                    />
                </Route>
            </Route>

            <Route
                path = "/auth/register"
                element={<Registration/>}
            />
            <Route
                path = "/auth/login"
                element={<Login/>}
            />
            <Route
                path = "/unauthorized"
                element={<Unauthorized/>}
            />
            <Route
                path = "/"
                element={<Login/>}
            />

            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default AppRoutes;