import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {

        const response = await axios.post('https://localhost:7212/api/token/refresh', null,{
                withCredentials: true
            });

        const newAccessToken = response.data;
        console.log('Get while refreshing: ' + newAccessToken);

        if (newAccessToken) {
            setAuth(prev =>
                ({...prev,
                    accessToken: newAccessToken,
                    user: prev.user,
                    role: prev.role
                }));
        }

        return newAccessToken;
    }

    return refresh;
}

export default useRefreshToken;