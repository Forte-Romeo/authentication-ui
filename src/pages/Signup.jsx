import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation"
import PasswordRequirements from "../components/PasswordRequirements";
import { apiRequest } from "../../server/src/utils/api.js";

function Signup({ onLogin }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (
            password.length < 8 ||
            !/\d/.test(password) ||
            !/[A-Z]/.test(password)
        ) {
            newErrors.password =
            "Password does not meet the requirements.";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword =
            "Please confirm your password.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword =
            "Passwords do not match.";
        }

        if (!acceptedTerms) {
            newErrors.terms =
            "You must accept the Terms & Conditions.";
        }

        setErrors(newErrors);
        setSuccess("");

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);

        try {
            const response = await apiRequest("/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    name: fullName,
                    email,
                    password,
                    confirmPassword,
                }),
            });

            setSuccess(response.message);

            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAcceptedTerms(false);
            setErrors({});
        } catch (error) {
            if (error.status === 409) {
                setErrors({
                    email: error.message,
                });
            } else if (
                error.status === 400 &&
                error.data?.errors
            ) {
                const backendErrors = {};

                error.data.errors.forEach((validationError) => {
                    const field = validationError.field;

                    if (field === "name") {
                        backendErrors.fullName =
                            validationError.message;
                    } else {
                        backendErrors[field] =
                            validationError.message;
                    }
                });

                setErrors(backendErrors);
            } else {
                setErrors({
                    form:
                        error.message ||
                        "Unable to create your account. Please try again.",
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
    <>
        <div className="auth-header">
            <h1>FORTE AUTH</h1>

            <h2>Create an account</h2>

            <p>Join Forte and get started today.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
            <Input
                label="Full name"
                type="text"
                id="signup-name"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                error={errors.fullName}
            />

            <Input
                label="Email address"
                type="email"
                id="signup-email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={errors.email}
            />

            <Input
                label="Password"
                type="password"
                id="signup-password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={errors.password}
            />

            <PasswordRequirements password={password} />

            <Input
                label="Confirm password"
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword}
            />

            <label className="terms-checkbox">
                <input 
                    type="checkbox" 
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                />

                <span>
                    I agree to the Terms & Conditions
                </span>
            </label>

            {errors.terms && (
                <span className="error-message">
                    {errors.terms}
                </span>
            )}

            {errors.form && (
                <span className="error-message">
                    {errors.form}
                </span>
            )}

            <Button type="submit" loading={loading}>
                Create Account
            </Button>
        </form>

        {success && (
            <div className="success-message">
                {success}
            </div>
        )}

        <div className="auth-footer">
            <p>
                Already have an account?{" "}
                <button
                    type="button"
                    className="text-button"
                    onClick={onLogin}
                >
                    Sign in
                </button>
            </p>
        </div>
    </>
  );
}

export default Signup;