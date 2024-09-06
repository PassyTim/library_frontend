import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth,setAuth] = useState(()=>{
        const user = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        const role = localStorage.getItem('role');

        return user && accessToken && role ?
            { user: JSON.parse(user), accessToken, role } : {};
    });

    useEffect(() => {
        if (auth && auth.accessToken && auth.user && auth.role) {
            console.log(`setting local storage data`)
            localStorage.setItem('accessToken', auth.accessToken);
            localStorage.setItem('user', JSON.stringify(auth.user));
            localStorage.setItem('role', auth.role);
        } else {
            if (auth && Object.keys(auth).length === 0){
                console.log(`removing local storage data`)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }
        }
    }, [auth]);

    const logout = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
