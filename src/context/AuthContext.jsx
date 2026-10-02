import {
    createContext,
    useCallback,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = useCallback((authData) => {
        setUser(authData.user);
        setAccessToken(authData.accessToken);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setAccessToken(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            accessToken,
            isAuthenticated: Boolean(accessToken),
            login,
            logout,
        }),
        [user, accessToken, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthProvider,
    AuthContext,
};