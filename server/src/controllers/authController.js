import {
    findUserByEmail,
    createUser,
} from "../repositories/userRepository.js";

import {
    normalizeEmail,
    normalizeName,
} from "../utils/userValidation.js";

import { hashPassword } from "../utils/password.js";
import { serializeUser } from "../utils/userSerializer.js";

const signup = async (req, res) => {
    const name = normalizeName(req.body.name);
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "An account with this email already exists",
        });
    }

    const passwordHash = await hashPassword(password);

    const user = await createUser({
        name,
        email,
        passwordHash,
    });

    res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: serializeUser(user),
    });
};

export { signup };