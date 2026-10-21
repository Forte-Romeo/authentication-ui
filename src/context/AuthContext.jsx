import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { apiRequest, setRefreshAccessTokenHandler } from "../utils/api.js";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const login = useCallback((authData) => {
        setUser(authData.user);
        setAccessToken(authData.accessToken);
    }, []);

    const logout = useCallback(async () => {
        try {
            await apiRequest("/auth/logout", {
                method: "POST",
            });
        } catch (error) {
            console.error("Backend logout failed:", error.message);
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    }, []);

    const refreshAccessToken = useCallback(async () => {
        try {
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
        } catch (error) {
            //An invalid, expired, or revoked refresh session
            // requires the user to sign in again.
            if (error.status === 401 || error.status === 403) {
                await logout();
            }

            // Network/server errors are propagated too, but do
            // not automatically clear auth state.
            throw error;
        }
    }, [logout]);

    useEffect(() => {
        let isMounted = true;

        setRefreshAccessTokenHandler(refreshAccessToken);

        const restoreSession = async () => {
            try {
                await refreshAccessToken();
            } catch (error) {
                if (error.status !== 401 && error.status !== 403) {
                    console.error(
                        "Session restoration failed:",
                        error.message
                    );
                }
            } finally {
                if (isMounted) {
                    setIsInitializing(false);
                }
            }
        };

        restoreSession();

        return () => {
            isMounted = false;
            setRefreshAccessTokenHandler(null);
        };
    }, [refreshAccessToken]);

    const value = useMemo(
        () => ({
            user,
            accessToken,
            isAuthenticated: Boolean(accessToken),
            isInitializing,
            login,
            logout,
            refreshAccessToken,
        }),
        [user, accessToken, isInitializing, login, logout, refreshAccessToken]
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