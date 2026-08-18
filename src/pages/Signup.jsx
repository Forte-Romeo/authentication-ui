import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Signup({ onLogin }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
    <>
        <div className="auth-header">
            <h1>FORTE AUTH</h1>

            <h2>Create an account</h2>

            <p>Join Forte and get started today.</p>
        </div>

        <form className="auth-form">
            <Input
                label="Full name"
                type="text"
                id="signup-name"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
            />

            <Input
                label="Email address"
                type="email"
                id="signup-email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
            />

            <label className="terms-checkbox">
                <input type="checkbox" />

                <span>
                    I agree to the Terms & Conditions
                </span>
            </label>

            <Button type="submit">
                Create Account
            </Button>
        </form>

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