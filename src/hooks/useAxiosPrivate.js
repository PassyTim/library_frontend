import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import {useEffect} from "react";
import axiosPrivate from "../API/Axios"

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {

        const requestIntercept
            = axiosPrivate?.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }

                return config;
            }, (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercept
            = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    console.log('Refreshing token...');
                    await refresh();
                    console.log(`get from refresh : ${auth.accessToken}`);
                    prevRequest.headers['Authorization'] = `Bearer ${auth.accessToken}`;

                    setTimeout(() => {

                    }, 200)
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;