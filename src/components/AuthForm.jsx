function AuthForm() {
    return(
        <div className="auth-card">
            <div className="auth-header">
                <h1>FORTE AUTH</h1>

                <h2>Welcome back</h2>

                <p>Sign in to continue to your account.</p>
            </div>

            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>

                    <input 
                        type="email" 
                        id="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input 
                        type="password" 
                        id="password"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>

                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit" className="auth-button">
                    Sign In
                </button>
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