import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
    const { setAuth} = useAuth();

    const refresh = async () => {

        const response = await axios.post('https://localhost:7212/api/token/refresh', null,{
                withCredentials: true
            });

        setAuth(prev => {
            return {...prev,
                accessToken: response.data.accessToken
            }
        });
        console.log('get while refreshing ' + response.data);
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;