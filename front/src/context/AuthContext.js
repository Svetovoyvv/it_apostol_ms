import {createContext, useContext} from "react";
import {useLocalStorage} from "../hooks";

const AuthContext = createContext({
    isAuthorized: false,
    setAuthorized: (e) => {},
    isAdmin: false,
    setAdmin: (e) => {},
    userInfo: {
        email: '',
        name: '',
        token: ''
    },
    setUserInfo: (e) => {}
});
const AuthContextProvider = ({children}) => {
    const ctx_init = useContext(AuthContext);
    const [isAuthorized, setAuthorized] = useLocalStorage('isAuthorized',ctx_init.isAuthorized);
    const [isAdmin, setAdmin] = useLocalStorage('isAdmin', ctx_init.isAdmin);
    const [userInfo, setUserInfo_] = useLocalStorage('userInfo', ctx_init.userInfo);
    const setUserInfo = (value) => {
        setUserInfo_({...userInfo, ...value});
    }
    const context = {
        isAuthorized,
        setAuthorized,
        isAdmin,
        setAdmin,
        userInfo,
        setUserInfo,
    }
    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
};
const useAuthContext = () => {
    return useContext(AuthContext);
}
export {
    AuthContextProvider,
    useAuthContext
}