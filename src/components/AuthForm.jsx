import Input from "./Input";
import Button from "./Button";

function AuthForm() {
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
                />

                <Input
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
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
                <p>
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default AuthForm;