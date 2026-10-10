import {
    createContext,
    useCallback,
    useMemo,
    useState,
} from "react";

import { apiRequest } from "../../server/src/utils/api.js";

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

    const refreshAccessToken = useCallback(async () => {
        const response = await apiRequest("/auth/refresh", {
            method: "POST",
        });

        const newAccessToken = response?.data?.accessToken;

        if (!newAccessToken) {
            throw new Error(
                "The server did not return a new access token."
            );
        }

        setAccessToken(newAccessToken);

        return newAccessToken;
    }, []);

    const value = useMemo(
        () => ({
            user,
            accessToken,
            isAuthenticated: Boolean(accessToken),
            login,
            logout,
            refreshAccessToken,
        }),
        [user, accessToken, login, logout, refreshAccessToken]
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