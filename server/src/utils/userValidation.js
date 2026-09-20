const isValidEmail = (email) => {
    if (typeof email !== "string") {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateCreateUser = (body) => {
    const errors = [];

    const { name, email, password } = body;

    if (!name || typeof name !== "string") {
        errors.push({
            field: "name",
            message: "Name is required",
        });
    } else if (name.trim().length < 2) {
        errors.push({
            field: "name",
            message: "Name must be at least 2 characters",
        });
    }

    if (!email || typeof email !== "string") {
        errors.push({
            field: "email",
            message: "Email is required",
        });
    } else if (!isValidEmail(email.trim())) {
        errors.push({
            field: "email",
            message: "Please provide a valid email address",
        });
    } else if (email.trim().length > 255) {
        errors.push({
            field: "email",
            message: "Email must not exceed 255 characters",
        });
    }

    if (!password || typeof password !== "string") {
        errors.push({
            field: "password",
            message: "Password is required",
        });
    } else if (password.length < 8) {
        errors.push({
            field: "password",
            message: "Password must be at least 8 characters",
        });
    }

    return errors;
};

const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
};

const normalizeName = (name) => {
    return name.trim();
};

export {
    isValidEmail,
    validateCreateUser,
    normalizeEmail,
    normalizeName,
};