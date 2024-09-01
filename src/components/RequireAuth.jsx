import React from 'react';
import useAuth from "../hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        <div>
            {allowedRoles?.includes(auth?.role)
                ? <Outlet/>
                : auth?.user
                    ? <Navigate to={'/unauthorized'} state={{from: location}} replace/>
                    : <Navigate to={'/auth/login'} state={{from: location}} replace/>
            }
        </div>
    );
};

export default RequireAuth;