const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// AuthContext registers the refresh function here.
let refreshAccessTokenHandler = null;

// Concurrent 401 responses share one refresh operation.
let refreshPromise = null;

function setRefreshAccessTokenHandler(handler) {
    refreshAccessTokenHandler = handler;
}

async function parseResponse(response) {
    let data = null;

    try {
        data = await response.json();
    } catch {
        // The response may not contain JSON.
    }

    if (!response.ok) {
        const error = new Error(
        data?.message ||
            "Something went wrong. Please try again."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
};

async function sendRequest(endpoint, options, token) {
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // Always replace the Authorization header with the
    // token being used for this particular attempt.
    delete headers.Authorization;
    delete headers.authorization;

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
    });
}

async function apiRequest(
    endpoint,
    options = {},
    accessToken = null
) {
    let response = await sendRequest(
        endpoint,
        options,
        accessToken
    );

    const shouldRefresh =
        response.status === 401 &&
        Boolean(accessToken) &&
        endpoint !== "/auth/refresh" &&
        typeof refreshAccessTokenHandler === "function";

    if (!shouldRefresh) {
        return parseResponse(response);
    }

    
    let newAccessToken;

    if (!refreshPromise) {
        const currentPromise = Promise.resolve().then(
            () => refreshAccessTokenHandler()
        );

        refreshPromise = currentPromise;

        currentPromise.then(
            () => {
                if (refreshPromise === currentPromise) {
                    refreshPromise = null;
                }
            },
            () => {
                if (refreshPromise === currentPromise) {
                    refreshPromise = null;
                }
            }
        );
    }

    newAccessToken = await refreshPromise;

    if (!newAccessToken) {
        const error = new Error(
        "Unable to refresh your session. Please log in again."
        );

        error.status = 401;
        throw error;
    }

    // Retry the original request only once.
    response = await sendRequest(
        endpoint,
        options,
        newAccessToken
    );

    return parseResponse(response);
};

export { apiRequest, setRefreshAccessTokenHandler };
