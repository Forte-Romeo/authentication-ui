import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function ForgotPassword({ onLogin }) {
    const [email, setEmail] = useState("");

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

            <form className="auth-form">
                <Input
                    label="Email address"
                    type="email"
                    id="forgot-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Button type="submit">
                    Send Reset Link
                </Button>
            </form>

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