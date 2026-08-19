import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation"

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

    function handleSubmit(event) {
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
        } else if (password.length < 8) {
            newErrors.password =
            "Password must be at least 8 characters.";
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

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);
        setSuccess("");

        setTimeout(() => {
            setLoading(false);
            setSuccess("Account created successfully.");
        }, 1500);
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