const API_BASE_URL = "http://localhost:5000/api";

const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(
            data.message || "Something went wrong"
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
};

export { apiRequest };