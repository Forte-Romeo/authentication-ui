import { useEffect, useState } from "react";
import { apiRequest } from "../../server/src/utils/api.js";
import useAuth from "../context/useAuth.js";

function AuthenticatedUser() {
    const {
        user,
        accessToken,
        logout,
    } = useAuth();

    const [profile, setProfile] = useState(user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        async function loadProfile() {
            setLoading(true);
            setError("");

            try {
                const response = await apiRequest(
                    "/users/me",
                    {
                        method: "GET",
                    },
                    accessToken
                );

                setProfile(response.data);
            } catch (requestError) {
                if (requestError.status === 401) {
                    logout();
                    return;
                }

                setError(
                    requestError.message ||
                        "Unable to load your profile."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [accessToken, logout]);

    if (!accessToken) {
        return null;
    }

    if (loading) {
        return (
            <div className="authenticated-user">
                <div className="authenticated-loading">
                    <span className="loading-spinner"></span>

                    <p>Loading your account...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="authenticated-user">
                <div className="authenticated-error">
                    <h2>Something went wrong</h2>

                    <p>{error}</p>

                    <button
                        type="button"
                        className="auth-action-button"
                        onClick={logout}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="authenticated-user">
            <div className="authenticated-header">
                <span className="authenticated-eyebrow">
                    FORTE AUTH
                </span>

                <h1>Welcome back</h1>

                <p>
                    You are successfully authenticated.
                </p>
            </div>

            <div className="user-profile-card">
                <div className="user-avatar">
                    {profile?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                </div>

                <div className="user-profile-info">
                    <h2>{profile?.name}</h2>

                    <p>{profile?.email}</p>
                </div>
            </div>

            <div className="user-details">
                <div className="user-detail">
                    <span className="user-detail-label">
                        Account ID
                    </span>

                    <span className="user-detail-value">
                        {profile?.id}
                    </span>
                </div>

                <div className="user-detail">
                    <span className="user-detail-label">
                        Role
                    </span>

                    <span className="user-detail-value user-role">
                        {profile?.role}
                    </span>
                </div>
            </div>

            <div className="authenticated-status">
                <span className="status-indicator"></span>

                <span>
                    Authentication active
                </span>
            </div>

            <button
                type="button"
                className="auth-action-button"
                onClick={logout}
            >
                Sign out
            </button>
        </div>
    );
}

export default AuthenticatedUser;