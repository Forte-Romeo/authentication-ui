import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Login({ onSignup, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="auth-header">
        <h1>FORTE AUTH</h1>

        <h2>Welcome back</h2>

        <p>Sign in to continue to your account.</p>
      </div>

      <form className="auth-form">
        <Input
          label="Email address"
          type="email"
          id="login-email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Password"
          type="password"
          id="login-password"
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

          <button
            type="button"
            className="text-button"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit">
          Sign In
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;