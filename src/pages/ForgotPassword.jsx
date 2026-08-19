import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation"

function ForgotPassword({ onLogin }) {
    const [email, setEmail] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!isValidEmail(email)) {
            newErrors.email =
            "Please enter a valid email address.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);
        setSuccess("");

        setTimeout(() => {
            setLoading(false);
            setSuccess(
            "If an account exists with this email, a reset link has been sent."
            );
        }, 1500);
    }

    return (
        <>
            <div className="auth-header">
                <h1>FORTE AUTH</h1>

                <h2>Forgot password?</h2>

                <p>
                    Enter your email and we'll send you a
                    password reset link.
                </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    label="Email address"
                    type="email"
                    id="forgot-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={errors.email}
                />

                <Button type="submit" loading={loading}>
                    Send Reset Link
                </Button>
            </form>

            {success && (
                <div className="success-message">
                    {success}
                </div>
            )}

            <div className="auth-footer">
                <p>
                    Remember your password?{" "}
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

export default ForgotPassword;