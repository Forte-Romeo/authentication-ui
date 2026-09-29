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
    } else if (name.trim().length > 100) {
        errors.push({
            field: "name",
            message: "Name must not exceed 100 characters",
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
    } else if (password.length > 72) {
        errors.push({
            field: "password",
            message: "Password must not exceed 72 characters",
        });
    } else if (!/\d/.test(password)) {
        errors.push({
            field: "password",
            message: "Password must contain at least one number",
        });
    } else if (!/[A-Z]/.test(password)) {
        errors.push({
            field: "password",
            message: "Password must contain at least one uppercase letter",
        });
    }

    return errors;
};

const validateSignup = (body) => {
    const errors = validateCreateUser(body);

    const { password, confirmPassword } = body;

    if (
        confirmPassword === undefined ||
        typeof confirmPassword !== "string"
    ) {
        errors.push({
            field: "confirmPassword",
            message: "Please confirm your password",
        });
    } else if (password !== confirmPassword) {
        errors.push({
            field: "confirmPassword",
            message: "Passwords do not match",
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
    validateSignup,
    normalizeEmail,
    normalizeName,
};