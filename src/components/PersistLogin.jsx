import React, {useEffect, useState} from 'react';
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./UI/loader/Loader";
import {Outlet} from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        const accessToken = auth?.accessToken;
        console.log('accessToken ' + accessToken);

        if (!accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        console.log("IsLoading " + isLoading);
        console.log("aT " + auth?.accessToken);
    }, [isLoading]);

    return (
        <>
            {isLoading
                ? <Loader/>
                : <Outlet/>
            }
        </>
    );
};

export default PersistLogin;