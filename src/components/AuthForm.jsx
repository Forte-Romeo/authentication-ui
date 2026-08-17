import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    return(
        <div className="auth-card">
            <div className="auth-header">
                <h1>FORTE AUTH</h1>

                <h2>Welcome back</h2>

                <p>Sign in to continue to your account.</p>
            </div>

            <form className="auth-form">
                <Input
                    label="Email address"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>

                    <a href="#">Forgot password?</a>
                </div>

                <Button type="submit">
                    Sign In
                </Button>
            </form>

            <div className="auth-footer">
                {authMode === "login" && (
                    <p>
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="text-button"
                            onClick={() => setAuthMode("signup")}    
                        >
                            Sign up
                        </button>
                    </p>
                )}

                {authMode === "signup" && (
                    <p>
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="text-button"
                            onClick={() => setAuthMode("login")}    
                        >
                            Sign in
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default AuthForm;